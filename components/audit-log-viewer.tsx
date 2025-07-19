"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AuditLogEntry {
  id: string
  timestamp: string
  user: string
  action: string
  details: string
  ipAddress: string
  userAgent: string
  severity: "low" | "medium" | "high"
}

export function AuditLogViewer() {
  // Sample audit log data - in a real app, this would come from your API
  const [auditLogs] = useState<AuditLogEntry[]>([
    {
      id: "1",
      timestamp: "2025-01-19T14:30:00Z",
      user: "admin@example.com",
      action: "USER_ROLE_CHANGED",
      details: "Changed user john.doe@example.com role from user to admin",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "high",
    },
    {
      id: "2",
      timestamp: "2025-01-19T14:25:00Z",
      user: "admin@example.com",
      action: "USER_LOGIN",
      details: "Successful admin login",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "low",
    },
    {
      id: "3",
      timestamp: "2025-01-19T14:20:00Z",
      user: "jane.smith@example.com",
      action: "USER_DELETED",
      details: "Deleted user account for mike.johnson@example.com",
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      severity: "high",
    },
    {
      id: "4",
      timestamp: "2025-01-19T14:15:00Z",
      user: "system",
      action: "BACKUP_COMPLETED",
      details: "Daily database backup completed successfully",
      ipAddress: "127.0.0.1",
      userAgent: "System/1.0",
      severity: "low",
    },
    {
      id: "5",
      timestamp: "2025-01-19T14:10:00Z",
      user: "jane.smith@example.com",
      action: "SETTINGS_UPDATED",
      details: "Updated system notification settings",
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      severity: "medium",
    },
  ])

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "low":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case "USER_LOGIN":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
        )
      case "USER_ROLE_CHANGED":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        )
      case "USER_DELETED":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        )
      case "BACKUP_COMPLETED":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case "SETTINGS_UPDATED":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
    }
  }

  return (
    <Card className="bg-black/5 backdrop-blur-[2px] border border-white/10 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white drop-shadow-xl">Audit Log</CardTitle>
        <CardDescription className="text-gray-200 drop-shadow-lg">
          System activity and security events log
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/20">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider drop-shadow-lg">
                      Timestamp
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider drop-shadow-lg">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider drop-shadow-lg">
                      Action
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider drop-shadow-lg">
                      Details
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider drop-shadow-lg">
                      Severity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-200 drop-shadow-lg">
                        {formatTimestamp(log.timestamp)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-200 drop-shadow-lg">{log.user}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <div className="text-gray-300">{getActionIcon(log.action)}</div>
                          <span className="text-sm text-gray-200 drop-shadow-lg">
                            {log.action.replace(/_/g, " ").toLowerCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-200 max-w-xs truncate drop-shadow-lg">
                        {log.details}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getSeverityColor(
                            log.severity,
                          )}`}
                        >
                          {log.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {auditLogs.map((log) => (
              <div key={log.id} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 space-y-3 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="text-gray-300">{getActionIcon(log.action)}</div>
                    <span className="text-sm font-medium text-white drop-shadow-lg">
                      {log.action.replace(/_/g, " ").toLowerCase()}
                    </span>
                  </div>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getSeverityColor(
                      log.severity,
                    )}`}
                  >
                    {log.severity}
                  </span>
                </div>

                <div className="text-sm text-gray-200 drop-shadow-lg">{log.details}</div>

                <div className="flex justify-between items-center text-xs text-gray-300 drop-shadow-lg">
                  <span>{log.user}</span>
                  <span>{formatTimestamp(log.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="pt-4 text-center">
            <Button
              variant="outline"
              className="bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm border border-white/20"
            >
              Load More Entries
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
