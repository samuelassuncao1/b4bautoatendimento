import { useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import Button from '../components/Button';
import { VidaClaimData, RCOClaimData, DocumentFile } from '../types';
import { DOCUMENT_TYPES } from '../constants';

interface Page4Props {
  claimData: VidaClaimData | RCOClaimData;
  documents: DocumentFile[];
  onDocumentsChange: (documents: DocumentFile[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Page4({ claimData, documents, onDocumentsChange, onNext, onBack }: Page4Props) {
  const [dragActive, setDragActive] = useState(false);

  const getRequiredDocuments = (): string[] => {
    const allDocs: string[] = [];
    if ('coberturas' in claimData && claimData.coberturas) {
      claimData.coberturas.forEach(cobertura => {
        const docs = DOCUMENT_TYPES[cobertura];
        if (docs) {
          docs.forEach(doc => {
            if (!allDocs.includes(doc)) {
              allDocs.push(doc);
            }
          });
        }
      });
    }
    return allDocs;
  };

  const requiredDocuments = getRequiredDocuments();

  const handleFileChange = (documentType: string, files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 25 * 1024 * 1024;
      return validTypes.includes(file.type) && file.size <= maxSize;
    });

    if (validFiles.length === 0) {
      alert('Por favor, selecione apenas arquivos PDF, JPG ou PNG de até 25MB.');
      return;
    }

    const newDocuments = validFiles.map(file => ({
      file,
      documentType
    }));

    onDocumentsChange([...documents, ...newDocuments]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, documentType: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(documentType, e.dataTransfer.files);
    }
  };

  const removeDocument = (index: number) => {
    const newDocuments = documents.filter((_, i) => i !== index);
    onDocumentsChange(newDocuments);
  };

  const getDocumentsForType = (documentType: string) => {
    return documents.filter(doc => doc.documentType === documentType);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Documentos</h2>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Upload de Documentos</h3>
        <p className="text-gray-600">
          Envie os documentos necessários para análise do sinistro. Formatos aceitos: PDF, JPG, PNG (máx. 25MB cada).
        </p>
      </div>

      <div className="mb-8">
        {requiredDocuments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Selecione pelo menos uma cobertura para ver os documentos necessários.
          </div>
        ) : (
          <div className="space-y-6">
            {requiredDocuments.map((docType, index) => {
              const docsForType = getDocumentsForType(docType);
              return (
                <div key={index} className="border-2 border-gray-300 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">{docType}</h4>

                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragActive ? 'border-[#003366] bg-blue-50' : 'border-gray-300'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={(e) => handleDrop(e, docType)}
                  >
                    <Upload className="mx-auto mb-3 text-gray-400" size={32} />
                    <p className="text-gray-700 mb-2">Arraste arquivos aqui ou selecione do seu dispositivo</p>
                    <p className="text-sm text-gray-500 mb-4">PDF, JPG ou PNG até 25MB</p>
                    <input
                      type="file"
                      id={`file-${index}`}
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => handleFileChange(docType, e.target.files)}
                    />
                    <label
                      htmlFor={`file-${index}`}
                      className="inline-block px-6 py-2 bg-[#003366] text-white rounded-lg cursor-pointer hover:bg-[#004488] transition-colors"
                    >
                      Selecionar Arquivos
                    </label>
                  </div>

                  {docsForType.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {docsForType.map((doc, docIndex) => {
                        const globalIndex = documents.findIndex(d => d === doc);
                        return (
                          <div key={docIndex} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="text-[#003366]" size={24} />
                              <div>
                                <p className="font-medium text-gray-800">{doc.file.name}</p>
                                <p className="text-sm text-gray-500">
                                  {(doc.file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeDocument(globalIndex)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="secondary">
          Voltar
        </Button>
        <Button onClick={onNext}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
