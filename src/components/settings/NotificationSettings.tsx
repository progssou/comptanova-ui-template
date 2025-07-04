
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    invoice: true,
    payment: true,
    reports: false,
    security: true
  });

  const handleNotificationToggle = (type: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Préférences de notification</CardTitle>
          <CardDescription>
            Choisissez comment vous souhaitez être informé
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Canaux de notification</h4>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notif">Notifications par email</Label>
                <p className="text-sm text-gray-600">Recevez les notifications importantes par email</p>
              </div>
              <Switch
                id="email-notif"
                checked={notifications.email}
                onCheckedChange={(value) => handleNotificationToggle('email', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notif">Notifications push</Label>
                <p className="text-sm text-gray-600">Notifications dans votre navigateur</p>
              </div>
              <Switch
                id="push-notif"
                checked={notifications.push}
                onCheckedChange={(value) => handleNotificationToggle('push', value)}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Types de notification</h4>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="invoice-notif">Factures</Label>
                <p className="text-sm text-gray-600">Nouvelles factures, échéances, paiements</p>
              </div>
              <Switch
                id="invoice-notif"
                checked={notifications.invoice}
                onCheckedChange={(value) => handleNotificationToggle('invoice', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="payment-notif">Paiements</Label>
                <p className="text-sm text-gray-600">Confirmations de paiement et encaissements</p>
              </div>
              <Switch
                id="payment-notif"
                checked={notifications.payment}
                onCheckedChange={(value) => handleNotificationToggle('payment', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reports-notif">Rapports</Label>
                <p className="text-sm text-gray-600">Rapports mensuels et analyses automatiques</p>
              </div>
              <Switch
                id="reports-notif"
                checked={notifications.reports}
                onCheckedChange={(value) => handleNotificationToggle('reports', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="security-notif">Sécurité</Label>
                <p className="text-sm text-gray-600">Connexions suspectes et activités importantes</p>
              </div>
              <Switch
                id="security-notif"
                checked={notifications.security}
                onCheckedChange={(value) => handleNotificationToggle('security', value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
