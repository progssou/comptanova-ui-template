import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  Download, 
  Filter, 
  FileText, 
  Image, 
  Upload, 
  Eye, 
  File, 
  FileSpreadsheet,
  FileImage,
  MoreVertical,
  ExternalLink,
  Pencil,
  Trash2,
  History,
  CheckCircle,
  XCircle,
  Archive
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  amount: number;
  status: "comptabilisé" | "en_attente" | "traité" | "validé" | "archivé" | "rejeté";
  category: string;
  supplier: string;
  reference?: string;
  tags?: string[];
  lastModified?: string;
  size?: string;
}

const documents: Document[] = [
  // Factures clients
  {
    id: "DOC001",
    name: "Facture FAC-2024-001.pdf",
    type: "Facture client",
    date: "2024-03-25",
    amount: 1200.00,
    status: "comptabilisé",
    category: "Ventes",
    supplier: "Dupont Consulting",
    reference: "FAC-2024-001",
    tags: ["facture", "vente", "conseil"],
    lastModified: "2024-03-25 14:30",
    size: "245 KB"
  },
  {
    id: "DOC002",
    name: "Facture FAC-2024-002.pdf",
    type: "Facture client",
    date: "2024-03-24",
    amount: 3500.00,
    status: "en_attente",
    category: "Ventes",
    supplier: "Martin & Co",
    reference: "FAC-2024-002",
    tags: ["facture", "vente", "formation"],
    lastModified: "2024-03-24 16:45",
    size: "312 KB"
  },
  // Factures fournisseurs
  {
    id: "DOC003",
    name: "Facture fournisseur FRN-2024-001.pdf",
    type: "Facture fournisseur",
    date: "2024-03-23",
    amount: 850.00,
    status: "validé",
    category: "Achats",
    supplier: "TechStore SARL",
    reference: "FRN-2024-001",
    tags: ["facture", "achat", "matériel"],
    lastModified: "2024-03-23 11:20",
    size: "428 KB"
  },
  {
    id: "DOC004",
    name: "Facture maintenance INFO-2024-001.pdf",
    type: "Facture fournisseur",
    date: "2024-03-22",
    amount: 450.00,
    status: "en_attente",
    category: "Achats",
    supplier: "InfoMaintenance",
    reference: "INFO-2024-001",
    tags: ["facture", "service", "maintenance"],
    lastModified: "2024-03-22 09:15",
    size: "156 KB"
  },
  // Notes de frais
  {
    id: "DOC005",
    name: "Note de frais NF-2024-001.pdf",
    type: "Note de frais",
    date: "2024-03-21",
    amount: 127.50,
    status: "validé",
    category: "Frais",
    supplier: "Jean Dupont",
    reference: "NF-2024-001",
    tags: ["note de frais", "déplacement"],
    lastModified: "2024-03-21 15:40",
    size: "189 KB"
  },
  {
    id: "DOC006",
    name: "Note de frais NF-2024-002.pdf",
    type: "Note de frais",
    date: "2024-03-20",
    amount: 85.30,
    status: "en_attente",
    category: "Frais",
    supplier: "Marie Martin",
    reference: "NF-2024-002",
    tags: ["note de frais", "repas"],
    lastModified: "2024-03-20 17:25",
    size: "142 KB"
  },
  // Documents bancaires
  {
    id: "DOC007",
    name: "Relevé bancaire Mars 2024.pdf",
    type: "Relevé bancaire",
    date: "2024-03-19",
    amount: 0,
    status: "traité",
    category: "Banque",
    supplier: "Crédit Mutuel",
    reference: "RB-2024-003",
    tags: ["banque", "relevé"],
    lastModified: "2024-03-19 10:00",
    size: "856 KB"
  },
  {
    id: "DOC008",
    name: "Avis de prélèvement SEPA.pdf",
    type: "Document bancaire",
    date: "2024-03-18",
    amount: 2400.00,
    status: "traité",
    category: "Banque",
    supplier: "Crédit Mutuel",
    reference: "SEPA-2024-001",
    tags: ["banque", "prélèvement"],
    lastModified: "2024-03-18 14:15",
    size: "124 KB"
  },
  // Contrats et documents administratifs
  {
    id: "DOC009",
    name: "Contrat assurance 2024.pdf",
    type: "Contrat",
    date: "2024-03-15",
    amount: 2400.00,
    status: "archivé",
    category: "Assurance",
    supplier: "AXA Assurances",
    reference: "CTR-2024-001",
    tags: ["contrat", "assurance"],
    lastModified: "2024-03-15 11:30",
    size: "1.2 MB"
  },
  {
    id: "DOC010",
    name: "Attestation fiscale 2024.pdf",
    type: "Document administratif",
    date: "2024-03-14",
    amount: 0,
    status: "archivé",
    category: "Administration",
    supplier: "DGFIP",
    reference: "FISC-2024-001",
    tags: ["fiscal", "attestation"],
    lastModified: "2024-03-14 16:20",
    size: "234 KB"
  }
];

const Documents = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: Document["status"]) => {
    const variants = {
      "comptabilisé": { 
        color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300", 
        icon: <FileText className="h-3 w-3" /> 
      },
      "en_attente": { 
        color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300", 
        icon: <History className="h-3 w-3" /> 
      },
      "traité": { 
        color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300", 
        icon: <CheckCircle className="h-3 w-3" /> 
      },
      "validé": { 
        color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300", 
        icon: <CheckCircle className="h-3 w-3" /> 
      },
      "archivé": { 
        color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300", 
        icon: <Archive className="h-3 w-3" /> 
      },
      "rejeté": { 
        color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300", 
        icon: <XCircle className="h-3 w-3" /> 
      }
    } as const;
    
    return (
      <Badge 
        variant="secondary" 
        className={`flex items-center gap-1 ${variants[status].color}`}
      >
        {variants[status].icon}
        <span className="capitalize">{status.replace("_", " ")}</span>
      </Badge>
    );
  };

  const getDocumentIcon = (name: string) => {
    if (name.toLowerCase().endsWith('.pdf')) {
      return <FileText className="h-4 w-4 text-red-500 dark:text-red-400" />;
    }
    if (name.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
      return <FileImage className="h-4 w-4 text-blue-500 dark:text-blue-400" />;
    }
    if (name.toLowerCase().match(/\.(xlsx|xls|csv)$/)) {
      return <FileSpreadsheet className="h-4 w-4 text-green-500 dark:text-green-400" />;
    }
    return <File className="h-4 w-4 text-gray-500 dark:text-gray-400" />;
  };

  const getCategoryBadge = (category: string) => {
    const variants = {
      "Ventes": "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      "Achats": "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      "Frais": "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
      "Banque": "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
      "Assurance": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
      "Administration": "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
    } as const;
    
    return (
      <Badge 
        variant="secondary" 
        className={variants[category as keyof typeof variants] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"}
      >
        {category}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const handleDocumentAction = (action: string, docId: string) => {
    console.log(`Action ${action} pour le document ${docId}`);
    switch (action) {
      case 'view':
        toast({
          title: "Ouverture du document",
          description: "Le document s'ouvre dans un nouvel onglet.",
        });
        break;
      case 'edit':
        toast({
          title: "Modification du document",
          description: "Ouverture de l'éditeur de métadonnées.",
        });
        break;
      case 'delete':
        toast({
          title: "Suppression du document",
          description: "Le document a été supprimé avec succès.",
        });
        break;
      default:
        break;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    if (activeTab === "all") return true;
    if (activeTab === "invoices") return doc.type.includes("Facture");
    if (activeTab === "receipts") return doc.type === "Note de frais";
    if (activeTab === "contracts") return doc.type === "Contrat";
    if (activeTab === "pending") return doc.status === "en_attente";
    return true;
  }).filter(doc => {
    if (!searchTerm) return true;
    return (
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const stats = {
    total: documents.length,
    pending: documents.filter(d => d.status === "en_attente").length,
    processed: documents.filter(d => d.status === "comptabilisé").length,
    totalAmount: documents.reduce((sum, d) => sum + d.amount, 0)
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Pièces justificatives</h1>
            <p className="text-gray-600 dark:text-gray-400">Gestion des documents et factures</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowUploadModal(true)}
            >
              <Upload className="h-4 w-4" />
              Importer
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nouveau document
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Documents total</CardTitle>
              <CardDescription>Ce mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
              <p className="text-sm text-green-600 dark:text-green-400">+15% vs mois précédent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">En attente</CardTitle>
              <CardDescription>À traiter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.pending}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Nécessite une action</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Comptabilisés</CardTitle>
              <CardDescription>Ce mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.processed}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Intégrés en comptabilité</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Montant total</CardTitle>
              <CardDescription>Documents traités</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatAmount(stats.totalAmount)}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Valeur comptabilisée</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Gestion des documents</CardTitle>
                <CardDescription>Factures, reçus et pièces justificatives</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input 
                    placeholder="Rechercher un document..." 
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="invoices">Factures</TabsTrigger>
                <TabsTrigger value="receipts">Notes de frais</TabsTrigger>
                <TabsTrigger value="contracts">Contrats</TabsTrigger>
                <TabsTrigger value="pending">En attente</TabsTrigger>
              </TabsList>
              
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Fournisseur/Client</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getDocumentIcon(doc.name)}
                          <div className="flex flex-col">
                            <span className="font-medium">{doc.name}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{doc.size}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{formatDate(doc.date)}</TableCell>
                      <TableCell>{doc.supplier}</TableCell>
                      <TableCell className="font-mono">
                        {doc.amount > 0 ? formatAmount(doc.amount) : '-'}
                      </TableCell>
                      <TableCell>{getCategoryBadge(doc.category)}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDocumentAction('view', doc.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDocumentAction('edit', doc.id)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDocumentAction('download', doc.id)}>
                              <Download className="mr-2 h-4 w-4" />
                              Télécharger
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDocumentAction('external', doc.id)}>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Ouvrir
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDocumentAction('delete', doc.id)}
                              className="text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
