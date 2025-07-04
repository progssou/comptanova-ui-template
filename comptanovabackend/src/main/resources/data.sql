-- Nettoyage (à utiliser uniquement en développement, à commenter en production)


-- Insérer les pays supportés
INSERT INTO countries (id, code, name, currency, accounting_standard, created_at, updated_at)
VALUES
    (1, 'TN', 'Tunisie', 'TND', 'PCG_TUNISIEN', NOW(), NOW()),
    (2, 'FR', 'France', 'EUR', 'PCG_FRANCAIS', NOW(), NOW());

-- Insérer les types de comptes pour la Tunisie
INSERT INTO account_types (id, code, name, category, nature, country_id, created_at, updated_at)
VALUES
    (1, 'ACTIF_IMMOBILISE', 'Actif immobilisé', 'BILAN', 'DEBIT', 1, NOW(), NOW()),
    (2, 'ACTIF_CIRCULANT', 'Actif circulant', 'BILAN', 'DEBIT', 1, NOW(), NOW()),
    (3, 'ACTIF_TRESORERIE', 'Trésorerie actif', 'BILAN', 'DEBIT', 1, NOW(), NOW()),
    (4, 'CAPITAUX_PROPRES', 'Capitaux propres', 'BILAN', 'CREDIT', 1, NOW(), NOW()),
    (5, 'PASSIF_CIRCULANT', 'Passif circulant', 'BILAN', 'CREDIT', 1, NOW(), NOW()),
    (6, 'PASSIF_TRESORERIE', 'Trésorerie passif', 'BILAN', 'CREDIT', 1, NOW(), NOW()),
    (7, 'CHARGE', 'Charges', 'RESULTAT', 'DEBIT', 1, NOW(), NOW()),
    (8, 'PRODUIT', 'Produits', 'RESULTAT', 'CREDIT', 1, NOW(), NOW());

-- Insérer les types de comptes pour la France
INSERT INTO account_types (id, code, name, category, nature, country_id, created_at, updated_at)
VALUES
    (9, 'ACTIF_IMMOBILISE', 'Immobilisations', 'BILAN', 'DEBIT', 2, NOW(), NOW()),
    (10, 'ACTIF_CIRCULANT', 'Stocks et créances', 'BILAN', 'DEBIT', 2, NOW(), NOW()),
    (11, 'ACTIF_TRESORERIE', 'Disponibilités', 'BILAN', 'DEBIT', 2, NOW(), NOW()),
    (12, 'CAPITAUX_PROPRES', 'Capitaux propres', 'BILAN', 'CREDIT', 2, NOW(), NOW()),
    (13, 'DETTES', 'Dettes', 'BILAN', 'CREDIT', 2, NOW(), NOW()),
    (14, 'CHARGE', 'Charges', 'GESTION', 'DEBIT', 2, NOW(), NOW()),
    (15, 'PRODUIT', 'Produits', 'GESTION', 'CREDIT', 2, NOW(), NOW());

-- Insérer une entreprise tunisienne de test
INSERT INTO companies (id, name, address, phone, email, tax_number, country_id, created_at, updated_at)
VALUES (1, 'Entreprise Tunisienne SARL', 'Avenue Habib Bourguiba, 1000 Tunis', '+216 71 123 456', 'contact@entreprise-tn.com', '1234567A', 1, NOW(), NOW());

-- Insérer une entreprise française de test
INSERT INTO companies (id, name, address, phone, email, tax_number, country_id, created_at, updated_at)
VALUES (2, 'Entreprise Française SAS', '123 Rue de Rivoli, 75001 Paris', '+33 1 42 33 44 55', 'contact@entreprise-fr.com', 'FR12345678901', 2, NOW(), NOW());

-- Insérer des utilisateurs de test
INSERT INTO users (id, username, email, password, role, company_id, created_at, updated_at)
VALUES
    (1, 'superadmin', 'admin@comptanova.com', '$2a$10$kFZuHbCUJ8K1WKrYmZW2WO1cF7r8qTtHvMzL5p4B9G3XwN2I6O8Uy', 'SUPERADMIN', 1, NOW(), NOW()),
    (2, 'dirigeant_tn', 'dirigeant@entreprise-tn.com', '$2a$10$kFZuHbCUJ8K1WKrYmZW2WO1cF7r8qTtHvMzL5p4B9G3XwN2I6O8Uy', 'DIRIGEANT', 1, NOW(), NOW()),
    (3, 'comptable_tn', 'comptable@entreprise-tn.com', '$2a$10$kFZuHbCUJ8K1WKrYmZW2WO1cF7r8qTtHvMzL5p4B9G3XwN2I6O8Uy', 'COMPTABLE', 1, NOW(), NOW()),
    (4, 'dirigeant_fr', 'dirigeant@entreprise-fr.com', '$2a$10$kFZuHbCUJ8K1WKrYmZW2WO1cF7r8qTtHvMzL5p4B9G3XwN2I6O8Uy', 'DIRIGEANT', 2, NOW(), NOW());


--#Suitedesdonnées...

-- Plan comptable Tunisien (PCG Tunisien)
-- CLASSE 1 - COMPTES DE FINANCEMENT PERMANENT
INSERT INTO accounts (account_number, account_name, account_type_id, balance, is_active, company_id, created_at, updated_at) VALUES
('101', 'Capital social', 4, 100000.00, true, 1, NOW(), NOW()),
('106', 'Réserves', 4, 25000.00, true, 1, NOW(), NOW()),
('120', 'Résultat de l''exercice', 4, 15000.00, true, 1, NOW(), NOW()),
('161', 'Emprunts obligataires', 4, 50000.00, true, 1, NOW(), NOW()),
('162', 'Emprunts et dettes auprès des établissements de crédit', 4, 75000.00, true, 1, NOW(), NOW());

-- CLASSE 2 - COMPTES D'ACTIFS IMMOBILISES
INSERT INTO accounts (account_number, account_name, account_type_id, balance, is_active, company_id, created_at, updated_at) VALUES
('211', 'Terrains', 1, 80000.00, true, 1, NOW(), NOW()),
('213', 'Constructions', 1, 150000.00, true, 1, NOW(), NOW()),
('218', 'Installations techniques, matériel et outillage', 1, 45000.00, true, 1, NOW(), NOW()),
('221', 'Matériel de transport', 1, 35000.00, true, 1, NOW(), NOW()),
('228', 'Matériel informatique', 1, 25000.00, true, 1, NOW(), NOW());

-- CLASSE 3 - COMPTES DE STOCKS
INSERT INTO accounts (account_number, account_name, account_type_id, balance, is_active, company_id, created_at, updated_at) VALUES
('301', 'Matières premières', 2, 18000.00, true, 1, NOW(), NOW()),
('321', 'Produits en cours', 2, 12000.00, true, 1, NOW(), NOW()),
('351', 'Produits finis', 2, 22000.00, true, 1, NOW(), NOW());

-- CLASSE 4 - COMPTES DE TIERS
INSERT INTO accounts (account_number, account_name, account_type_id, balance, is_active, company_id, created_at, updated_at) VALUES
('401', 'Fournisseurs', 5, 28000.00, true, 1, NOW(), NOW()),
('411', 'Clients', 2, 45000.00, true, 1, NOW(), NOW()),
('421', 'Personnel - Rémunérations dues', 5, 8500.00, true, 1, NOW(), NOW()),
('431', 'Sécurité sociale', 5, 3200.00, true, 1, NOW(), NOW()),
('441', 'État - Impôts sur les bénéfices', 5, 5800.00, true, 1, NOW(), NOW()),
('451', 'TVA collectée', 5, 4200.00, true, 1, NOW(), NOW()),
('452', 'TVA déductible', 2, 2800.00, true, 1, NOW(), NOW());

-- CLASSE 5 - COMPTES FINANCIERS
INSERT INTO accounts (account_number, account_name, account_type_id, balance, is_active, company_id, created_at, updated_at) VALUES
('512', 'Banque', 3, 35000.00, true, 1, NOW(), NOW()),
('530', 'Caisse', 3, 2500.00, true, 1, NOW(), NOW()),
('540', 'Instruments de trésorerie', 3, 8000.00, true, 1, NOW(), NOW());

-- CLASSE 6 - COMPTES DE CHARGES
INSERT INTO accounts (account_number, account_name, account_type_id, balance, is_active, company_id, created_at, updated_at) VALUES
('601', 'Achats de matières premières', 7, 0.00, true, 1, NOW(), NOW()),
('611', 'Sous-traitance générale', 7, 0.00, true, 1, NOW(), NOW()),
('621', 'Personnel extérieur', 7, 0.00, true, 1, NOW(), NOW()),
('631', 'Impôts et taxes', 7, 0.00, true, 1, NOW(), NOW()),
('641', 'Rémunérations du personnel', 7, 0.00, true, 1, NOW(), NOW()),
('651', 'Charges sociales', 7, 0.00, true, 1, NOW(), NOW()),
('661', 'Charges financières', 7, 0.00, true, 1, NOW(), NOW()),
('671', 'Charges exceptionnelles', 7, 0.00, true, 1, NOW(), NOW()),
('681', 'Dotations aux amortissements', 7, 0.00, true, 1, NOW(), NOW());

-- CLASSE 7 - COMPTES DE PRODUITS
INSERT INTO accounts (account_number, account_name, account_type_id, balance, is_active, company_id, created_at, updated_at) VALUES
('701', 'Vente de produits finis', 8, 0.00, true, 1, NOW(), NOW()),
('706', 'Prestations de services', 8, 0.00, true, 1, NOW(), NOW()),
('721', 'Production immobilisée', 8, 0.00, true, 1, NOW(), NOW()),
('731', 'Variation des stocks', 8, 0.00, true, 1, NOW(), NOW()),
('741', 'Subventions d''exploitation', 8, 0.00, true, 1, NOW(), NOW()),
('751', 'Produits financiers', 8, 0.00, true, 1, NOW(), NOW()),
('771', 'Produits exceptionnels', 8, 0.00, true, 1, NOW(), NOW()),
('781', 'Reprises sur amortissements', 8, 0.00, true, 1, NOW(), NOW());

-- Plan comptable Français (PCG 2014)
INSERT INTO accounts (account_number, account_name, account_type_id, balance, is_active, company_id, created_at, updated_at)
VALUES
-- CLASSE 1 - COMPTES DE CAPITAUX
('101000', 'Capital', 11, 200000.00, true, 2, NOW(), NOW()),
('106000', 'Réserves', 11, 45000.00, true, 2, NOW(), NOW()),
('120000', 'Résultat de l''exercice', 11, 28000.00, true, 2, NOW(), NOW()),
('164000', 'Emprunts auprès des établissements de crédit', 12, 125000.00, true, 2, NOW(), NOW()),

-- CLASSE 2 - COMPTES D'IMMOBILISATIONS
('211000', 'Terrains', 9, 180000.00, true, 2, NOW(), NOW()),
('213000', 'Constructions', 9, 320000.00, true, 2, NOW(), NOW()),
('218100', 'Installations générales', 9, 65000.00, true, 2, NOW(), NOW()),
('218300', 'Matériel informatique', 9, 35000.00, true, 2, NOW(), NOW()),
('218500', 'Matériel de transport', 9, 45000.00, true, 2, NOW(), NOW()),

-- CLASSE 3 - COMPTES DE STOCKS ET EN-COURS
('310000', 'Matières premières', 10, 25000.00, true, 2, NOW(), NOW()),
('320000', 'Autres approvisionnements', 10, 8000.00, true, 2, NOW(), NOW()),
('370000', 'Stocks de marchandises', 10, 32000.00, true, 2, NOW(), NOW()),

-- CLASSE 4 - COMPTES DE TIERS
('401000', 'Fournisseurs', 12, 38000.00, true, 2, NOW(), NOW()),
('411000', 'Clients', 10, 65000.00, true, 2, NOW(), NOW()),
('421000', 'Personnel - rémunérations dues', 12, 12000.00, true, 2, NOW(), NOW()),
('431000', 'Sécurité sociale', 12, 5500.00, true, 2, NOW(), NOW()),
('445500', 'TVA collectée', 12, 8200.00, true, 2, NOW(), NOW()),
('445662', 'TVA déductible sur immobilisations', 10, 3800.00, true, 2, NOW(), NOW()),
('445666', 'TVA déductible sur autres biens et services', 10, 4200.00, true, 2, NOW(), NOW()),

-- CLASSE 5 - COMPTES FINANCIERS
('512000', 'Banque', 11, 48000.00, true, 2, NOW(), NOW()),
('530000', 'Caisse', 11, 3500.00, true, 2, NOW(), NOW()),

-- CLASSE 6 - COMPTES DE CHARGES
('601000', 'Achats de matières premières', 13, 0.00, true, 2, NOW(), NOW()),
('607000', 'Achats de marchandises', 13, 0.00, true, 2, NOW(), NOW()),
('611000', 'Sous-traitance générale', 13, 0.00, true, 2, NOW(), NOW()),
('621000', 'Personnel extérieur à l''entreprise', 13, 0.00, true, 2, NOW(), NOW()),
('635000', 'Impôts, taxes et versements assimilés', 13, 0.00, true, 2, NOW(), NOW()),
('641000', 'Rémunérations du personnel', 13, 0.00, true, 2, NOW(), NOW()),
('645000', 'Charges de sécurité sociale et de prévoyance', 13, 0.00, true, 2, NOW(), NOW()),
('661000', 'Charges d''intérêts', 13, 0.00, true, 2, NOW(), NOW()),
('681000', 'Dotations aux amortissements', 13, 0.00, true, 2, NOW(), NOW()),

-- CLASSE 7 - COMPTES DE PRODUITS
('701000', 'Ventes de produits finis', 14, 0.00, true, 2, NOW(), NOW()),
('707000', 'Ventes de marchandises', 14, 0.00, true, 2, NOW(), NOW()),
('706000', 'Prestations de services', 14, 0.00, true, 2, NOW(), NOW()),
('740000', 'Subventions d''exploitation', 14, 0.00, true, 2, NOW(), NOW()),
('761000', 'Produits financiers', 14, 0.00, true, 2, NOW(), NOW()),
('781000', 'Reprises sur amortissements et provisions', 14, 0.00, true, 2, NOW(), NOW());

-- Comptes (extrait de accountsData dans Accounts.tsx)
INSERT INTO accounts (id, account_number, account_name, category, type, balance, movements, is_active, created_at, updated_at, company_id, account_type_id) VALUES
(1, '201000', 'Frais d''établissement', 'Immobilisations incorporelles', 'Actif', 5000.00, 2, true, NOW(), NOW(), 1, 1),
(2, '213000', 'Constructions', 'Immobilisations corporelles', 'Actif', 250000.00, 3, true, NOW(), NOW(), 1, 1),
(3, '261000', 'Titres de participation', 'Immobilisations financières', 'Actif', 75000.00, 1, true, NOW(), NOW(), 1, 1),
(4, '311000', 'Matières premières', 'Stocks', 'Actif', 28500.00, 12, true, NOW(), NOW(), 1, 1),
(5, '411000', 'Clients', 'Créances', 'Actif', 45420.50, 28, true, NOW(), NOW(), 1, 1),
(6, '512000', 'Banque', 'Trésorerie', 'Actif', 68750.25, 45, true, NOW(), NOW(), 1, 1),
(7, '101000', 'Capital social', 'Capitaux propres', 'Passif', 150000.00, 2, true, NOW(), NOW(), 1, 2),
(8, '164000', 'Emprunts auprès des établissements de crédit', 'Dettes financières', 'Passif', 85000.00, 12, true, NOW(), NOW(), 1, 2),
(9, '401000', 'Fournisseurs', 'Dettes', 'Passif', 32950.00, 25, true, NOW(), NOW(), 1, 2),
(10, '421000', 'Personnel - Rémunérations dues', 'Dettes sociales', 'Passif', 15800.00, 8, true, NOW(), NOW(), 1, 2),
(11, '445000', 'État - Taxes sur le chiffre d''affaires', 'Dettes fiscales', 'Passif', 8500.00, 6, true, NOW(), NOW(), 1, 2),
(12, '601000', 'Achats de matières premières', 'Charges d''exploitation', 'Charge', 45000.00, 15, true, NOW(), NOW(), 1, 3),
(13, '606300', 'Fournitures d''entretien', 'Charges d''exploitation', 'Charge', 3250.00, 8, true, NOW(), NOW(), 1, 3),
(14, '613000', 'Locations', 'Charges externes', 'Charge', 24000.00, 12, true, NOW(), NOW(), 1, 3),
(15, '641000', 'Rémunérations du personnel', 'Charges de personnel', 'Charge', 120000.00, 24, true, NOW(), NOW(), 1, 3),
(16, '661000', 'Charges d''intérêts', 'Charges financières', 'Charge', 4500.00, 4, true, NOW(), NOW(), 1, 3),
(17, '701000', 'Ventes de produits finis', 'Produits d''exploitation', 'Produit', 285000.00, 45, true, NOW(), NOW(), 1, 4),
(18, '706000', 'Prestations de services', 'Produits d''exploitation', 'Produit', 165000.00, 32, true, NOW(), NOW(), 1, 4),
(19, '708000', 'Produits des activités annexes', 'Produits d''exploitation', 'Produit', 12500.00, 8, true, NOW(), NOW(), 1, 4),
(20, '762000', 'Produits des immobilisations financières', 'Produits financiers', 'Produit', 3500.00, 2, true, NOW(), NOW(), 1, 4),
(21, '775000', 'Produits des cessions d''éléments d''actif', 'Produits exceptionnels', 'Produit', 25000.00, 1, true, NOW(), NOW(), 1, 4);