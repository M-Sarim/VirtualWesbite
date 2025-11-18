import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  UserCheck,
  Activity,
  Download,
  Search,
  Trash2,
  Eye,
  Shield,
  Ban,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import type { AdminUser, ActivityLog } from "@/lib/types/user";

import AdminLayout from "./AdminLayout";
import DashboardKPIs from "./DashboardKPIs";
import DashboardQuickActions from "./DashboardQuickActions";
import DashboardAlerts from "./DashboardAlerts";
import DashboardActivityFeed from "./DashboardActivityFeed";
import RecentUsers from "./RecentUsers";

export default function AdminDashboard() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "admin" | "user">("all");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"users" | "logs">("users");

  useEffect(() => {
    loadUsers();
    loadActivityLogs();
  }, []);

  const loadUsers = () => {
    const usersData = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(usersData);
  };

  const loadActivityLogs = () => {
    const logs = JSON.parse(localStorage.getItem("activityLogs") || "[]");
    setActivityLogs(logs.reverse().slice(0, 50));
  };

  const addActivityLog = (action: string, details: string) => {
    const logs = JSON.parse(localStorage.getItem("activityLogs") || "[]");
    logs.push({
      id: `log_${Date.now()}`,
      userId: "admin",
      action,
      details,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("activityLogs", JSON.stringify(logs));
    loadActivityLogs();
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((u) => u.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      addActivityLog("User Deletion", `User ${userId} deleted by admin`);
      toast.success("User deleted successfully");
    }
  };

  const handleToggleStatus = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    const action = user?.isActive ? "deactivated" : "activated";

    const updatedUsers = users.map((u) =>
      u.id === userId ? { ...u, isActive: !u.isActive } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    addActivityLog("User Status Change", `User ${userId} ${action} by admin`);
    toast.success(`User ${action} successfully`);
  };

  const handleChangeRole = (userId: string, newRole: "admin" | "user") => {
    if (newRole === "admin") {
      const adminExists = users.some(
        (u) => u.role === "admin" && u.id !== userId
      );
      if (adminExists) {
        toast.error("Only one admin is allowed");
        return;
      }
    }

    const updatedUsers = users.map((u) =>
      u.id === userId
        ? { ...u, role: newRole, updatedAt: new Date().toISOString() }
        : u
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    addActivityLog(
      "Role Assignment",
      `User ${userId} role changed to ${newRole}`
    );
    toast.success("User role updated successfully");
  };

  const handleExportData = () => {
    const dataToExport = {
      users: users,
      activityLogs: activityLogs,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `admin-data-export-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully");
  };

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Active Users",
      value: users.filter((u) => u.isActive).length,
      icon: UserCheck,
      color: "bg-green-500",
    },
    {
      title: "New This Month",
      value: users.filter((u) => {
        const createdDate = new Date(u.createdAt);
        const now = new Date();
        return (
          createdDate.getMonth() === now.getMonth() &&
          createdDate.getFullYear() === now.getFullYear()
        );
      }).length,
      icon: UserPlus,
      color: "bg-purple-500",
    },
    {
      title: "Activity Logs",
      value: activityLogs.length,
      icon: Activity,
      color: "bg-orange-500",
    },
  ];

  return (
    <AdminLayout>
      {/* Header Section */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-blue-900 mb-1">
            Welcome, Admin!
          </h1>
          <p className="text-gray-600 text-base">
            Here's a quick overview of your platform's latest activity and key
            metrics.
          </p>
        </div>
        <img
          src="/src/assets/dashboard-illustration.svg"
          alt="Dashboard"
          className="w-32 h-32 hidden sm:block"
        />
      </div>

      {/* Dashboard Components Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <DashboardAlerts />
          <DashboardKPIs />
          <DashboardQuickActions />
          <DashboardActivityFeed />
        </div>
        <div className="flex flex-col gap-8">
          <RecentUsers />
        </div>
      </div>

      {/* User Management Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-background rounded-xl border p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-background rounded-xl border overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === "users"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              User Management
            </button>

            <button
              onClick={() => setActiveTab("logs")}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === "logs"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <Activity className="w-4 h-4 inline mr-2" />
              Activity Logs
            </button>
          </div>

          {/* USER MANAGEMENT TAB */}
          {activeTab === "users" && (
            <div className="p-6">
              {/* Search + Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex gap-2">
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value as any)}
                    className="border rounded-lg px-4 py-2 bg-background"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>

                  <Button onClick={handleExportData} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Role
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Company Type
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Created
                      </th>
                      <th className="text-right py-3 px-4 font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          {user.firstName} {user.surname}
                        </td>
                        <td className="py-3 px-4">{user.email}</td>

                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {user.role === "admin" && (
                              <Shield className="w-3 h-3 mr-1" />
                            )}
                            {user.role}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {user.companyType}
                        </td>

                        <td className="py-3 px-4">
                          {user.isActive ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                              <Ban className="w-3 h-3 mr-1" />
                              Inactive
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowUserModal(true);
                              }}
                              className="p-2 hover:bg-muted rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleToggleStatus(user.id)}
                              className="p-2 hover:bg-muted rounded-lg transition-colors"
                              title={user.isActive ? "Deactivate" : "Activate"}
                            >
                              {user.isActive ? (
                                <Ban className="w-4 h-4 text-red-500" />
                              ) : (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </button>

                            <button
                              onClick={() =>
                                handleChangeRole(
                                  user.id,
                                  user.role === "admin" ? "user" : "admin"
                                )
                              }
                              className="p-2 hover:bg-muted rounded-lg transition-colors"
                              title="Change Role"
                            >
                              <Shield className="w-4 h-4 text-purple-500" />
                            </button>

                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 hover:bg-muted rounded-lg transition-colors"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredUsers.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-8 text-center text-muted-foreground"
                        >
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ACTIVITY LOGS TAB */}
          {activeTab === "logs" && (
            <div className="p-6">
              <div className="space-y-3">
                {activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium">{log.action}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {log.details}
                          </p>
                        </div>

                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {activityLogs.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground">
                    No activity logs found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* USER MODAL */}
      {showUserModal && selectedUser && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowUserModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">
                  {selectedUser.firstName} {selectedUser.surname}
                </h3>
                <p className="text-muted-foreground">{selectedUser.email}</p>
              </div>

              <button
                onClick={() => setShowUserModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-medium">{selectedUser.role}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Company Type</p>
                  <p className="font-medium">{selectedUser.companyType}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">
                    {selectedUser.isActive ? "Active" : "Inactive"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">
                    {new Date(selectedUser.createdAt).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">
                    {new Date(selectedUser.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => handleToggleStatus(selectedUser.id)}
                  variant="outline"
                  className="flex-1"
                >
                  {selectedUser.isActive ? "Deactivate" : "Activate"}
                </Button>

                <Button
                  onClick={() => {
                    handleDeleteUser(selectedUser.id);
                    setShowUserModal(false);
                  }}
                  variant="destructive"
                  className="flex-1"
                >
                  Delete User
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}
