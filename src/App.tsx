import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import { ClaimFormData, ClaimType, VidaClaimData, RCOClaimData, DocumentFile } from './types';
import { supabase } from './lib/supabase';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [protocolNumber, setProtocolNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ClaimFormData>({
    insuranceCompany: '',
    claimType: '',
    contact: {
      cpfCnpj: '',
      isClient: false,
      name: '',
      emails: ['']
    },
    claimData: null
  });

  const [documents, setDocuments] = useState<DocumentFile[]>([]);

  const initializeClaimData = (type: ClaimType) => {
    if (type === 'vida') {
      const data: VidaClaimData = {
        nomeSolicitante: '',
        tipoVinculo: '',
        coberturas: [],
        ufOcorrencia: '',
        descricaoEvento: ''
      };
      setFormData(prev => ({ ...prev, claimData: data }));
    } else if (type === 'rco') {
      const data: RCOClaimData = {
        placaSegurado: '',
        houveDanosMateriais: '',
        seguradoAssumeCulpa: '',
        registradoBO: '',
        coberturas: [],
        ufOcorrencia: '',
        descricaoEvento: ''
      };
      setFormData(prev => ({ ...prev, claimData: data }));
    }
  };

  const handleClaimTypeChange = (type: ClaimType | '') => {
    setFormData(prev => ({ ...prev, claimType: type }));
    if (type) {
      initializeClaimData(type as ClaimType);
    } else {
      setFormData(prev => ({ ...prev, claimData: null }));
    }
  };

  const submitClaim = async () => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('claims')
        .insert({
          insurance_company: formData.insuranceCompany,
          claim_type: formData.claimType,
          contact_cpf_cnpj: formData.contact.cpfCnpj,
          contact_is_client: formData.contact.isClient,
          contact_name: formData.contact.name,
          contact_emails: formData.contact.emails.filter(e => e),
          claim_data: formData.claimData
        })
        .select()
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProtocolNumber(data.protocol_number);
        setCurrentPage(5);
      }
    } catch (error) {
      console.error('Error submitting claim:', error);
      alert('Erro ao enviar sinistro. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      insuranceCompany: '',
      claimType: '',
      contact: {
        cpfCnpj: '',
        isClient: false,
        name: '',
        emails: ['']
      },
      claimData: null
    });
    setDocuments([]);
    setProtocolNumber('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-12 px-4">
        {currentPage === 1 && (
          <Page1
            insuranceCompany={formData.insuranceCompany}
            onInsuranceCompanyChange={(value) =>
              setFormData(prev => ({ ...prev, insuranceCompany: value }))
            }
            onNext={() => setCurrentPage(2)}
          />
        )}

        {currentPage === 2 && (
          <Page2
            claimType={formData.claimType}
            onClaimTypeChange={handleClaimTypeChange}
            onNext={() => setCurrentPage(3)}
            onBack={() => setCurrentPage(1)}
          />
        )}

        {currentPage === 3 && formData.claimData && (
          <Page3
            claimType={formData.claimType as ClaimType}
            contact={formData.contact}
            onContactChange={(contact) =>
              setFormData(prev => ({ ...prev, contact }))
            }
            claimData={formData.claimData}
            onClaimDataChange={(data) =>
              setFormData(prev => ({ ...prev, claimData: data }))
            }
            onNext={() => setCurrentPage(4)}
            onBack={() => setCurrentPage(2)}
          />
        )}

        {currentPage === 4 && formData.claimData && (
          <Page4
            claimData={formData.claimData}
            documents={documents}
            onDocumentsChange={setDocuments}
            onNext={submitClaim}
            onBack={() => setCurrentPage(3)}
          />
        )}

        {currentPage === 5 && (
          <Page5
            protocolNumber={protocolNumber}
            onNewClaim={resetForm}
          />
        )}

        {isSubmitting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#003366] mx-auto mb-4"></div>
              <p className="text-lg font-semibold text-gray-800">Enviando sinistro...</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
