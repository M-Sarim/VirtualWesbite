import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Phone,
  MapPin,
  Clock,
  CreditCard,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar />
      <main className="flex-1 lg:ml-64 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20 lg:pt-12">
          {/* Welcome Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Welcome, John</h1>
            <p className="text-muted-foreground">
              Manage your UK business services from here
            </p>
          </div>

          {/* Active Services */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: MapPin,
                title: "Virtual Address",
                status: "Active",
                renewal: "Renews in 25 days",
              },
              {
                icon: FileText,
                title: "Company Formation",
                status: "Completed",
                renewal: "One-time purchase",
              },
              {
                icon: Phone,
                title: "Phone Service",
                status: "Active",
                renewal: "Renews in 10 days",
              },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="bg-background rounded-xl border p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                    <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {service.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.renewal}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                  >
                    Manage
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Dashboard Sections */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Documents */}
              <div className="bg-background rounded-xl border p-6">
                <h2 className="text-xl font-bold mb-4">Recent Documents</h2>
                <div className="space-y-3">
                  {[
                    { name: "Incorporation Certificate", date: "Dec 15, 2024" },
                    { name: "Tax ID Registration", date: "Dec 10, 2024" },
                    { name: "Mail Scan - Invoice.pdf", date: "Dec 8, 2024" },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {doc.date}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-background rounded-xl border p-6">
                <h2 className="text-xl font-bold mb-4">Notifications</h2>
                <div className="space-y-3">
                  {[
                    {
                      icon: Clock,
                      title: "Subscription Renewal",
                      desc: "Your virtual address renews in 25 days",
                      color: "blue",
                    },
                    {
                      icon: CreditCard,
                      title: "Payment Successful",
                      desc: "Annual virtual address subscription processed",
                      color: "green",
                    },
                  ].map((notif, idx) => {
                    const Icon = notif.icon;
                    return (
                      <div
                        key={idx}
                        className="flex gap-3 p-3 bg-muted/50 rounded-lg"
                      >
                        <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">{notif.title}</p>
                          <p className="text-muted-foreground text-xs">
                            {notif.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Billing */}
              <div className="bg-background rounded-xl border p-6">
                <h2 className="text-lg font-bold mb-4">Billing</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Next Payment
                    </p>
                    <p className="font-semibold">£25.00</p>
                    <p className="text-muted-foreground text-xs">
                      January 10, 2025
                    </p>
                  </div>
                  <Button className="w-full">Update Payment Method</Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Invoice
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-background rounded-xl border p-6">
                <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Download Documents
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    Add Service
                  </Button>
                </div>
              </div>

              {/* Support */}
              <div className="bg-primary/10 rounded-xl border border-primary/20 p-6">
                <h3 className="font-semibold mb-3">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our support team is ready to assist you.
                </p>
                <Button size="sm" className="w-full" asChild>
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
