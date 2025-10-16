import { CheckCircle, Mail, FileSearch, Bell } from 'lucide-react';
import Button from '../components/Button';

interface Page5Props {
  protocolNumber: string;
  onNewClaim: () => void;
}

export default function Page5({ protocolNumber, onNewClaim }: Page5Props) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500" size={64} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Sinistro Enviado com Sucesso!</h2>
        <p className="text-lg text-gray-600">Seu sinistro foi registrado e está sendo processado.</p>
      </div>

      <div className="bg-blue-50 border-2 border-[#003366] rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Número do Protocolo</h3>
        <p className="text-3xl font-bold text-[#003366]">{protocolNumber}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">O que acontece agora?</h3>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#6699CC] rounded-full flex items-center justify-center">
                <Mail className="text-white" size={24} />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Confirmação por E-mail</h4>
              <p className="text-gray-600">
                Enviamos uma confirmação com todos os detalhes do seu sinistro.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#6699CC] rounded-full flex items-center justify-center">
                <FileSearch className="text-white" size={24} />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Análise de Documentos</h4>
              <p className="text-gray-600">
                Nossa equipe irá analisar os documentos enviados e verificar todas as informações.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#6699CC] rounded-full flex items-center justify-center">
                <Bell className="text-white" size={24} />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Acompanhamento</h4>
              <p className="text-gray-600">
                Você receberá atualizações por e-mail sobre o andamento do seu sinistro.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mb-8">
        <h4 className="font-semibold text-gray-800 mb-2">Guarde seu número de protocolo</h4>
        <p className="text-gray-700">
          Use o número <span className="font-bold text-[#003366]">{protocolNumber}</span> para consultar
          o andamento do seu sinistro ou entrar em contato com nossa equipe.
        </p>
      </div>

      <div className="text-center">
        <Button onClick={onNewClaim}>
          Registrar Novo Sinistro
        </Button>
      </div>
    </div>
  );
}
