import { authenticatedFetch } from "@/services/auth";

export interface DocumentType {
  id: number;
  name: string;
  description: string;
}

export interface Document {
  id: number;
  userId: number;
  typeId: number;
  createdAt: string;
  updatedAt: string;
  documentType: DocumentType;
}

export async function getDocuments(): Promise<Document[]> {
  const response = await authenticatedFetch("/documents");

  if (!response.ok) {
    throw new Error("Não foi possível carregar os documentos.");
  }

  return response.json();
}

export async function getDocumentTypes(): Promise<DocumentType[]> {
  const response = await authenticatedFetch("/document-types");

  if (!response.ok) {
    throw new Error("Não foi possível carregar os tipos de documento.");
  }

  return response.json();
}

export async function createDocument(typeId: number): Promise<Document> {
  const response = await authenticatedFetch("/documents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ typeId }),
  });

  if (!response.ok) {
    throw new Error("Não foi possível adicionar o documento.");
  }

  return response.json();
}
