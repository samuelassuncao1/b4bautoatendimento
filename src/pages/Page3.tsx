import { Plus, X } from 'lucide-react';
import Input from '../components/Input';
import Select from '../components/Select';
import Textarea from '../components/Textarea';
import Checkbox from '../components/Checkbox';
import MultiSelect from '../components/MultiSelect';
import Button from '../components/Button';
import { ContactData, VidaClaimData, RCOClaimData, ClaimType } from '../types';
import { BRAZILIAN_STATES, TIPO_VINCULO_OPTIONS, VIDA_COBERTURA_OPTIONS, RCO_COBERTURA_OPTIONS } from '../constants';

interface Page3Props {
  claimType: ClaimType;
  contact: ContactData;
  onContactChange: (contact: ContactData) => void;
  claimData: VidaClaimData | RCOClaimData | null;
  onClaimDataChange: (data: VidaClaimData | RCOClaimData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Page3({
  claimType,
  contact,
  onContactChange,
  claimData,
  onClaimDataChange,
  onNext,
  onBack
}: Page3Props) {
  const addEmail = () => {
    onContactChange({ ...contact, emails: [...contact.emails, ''] });
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...contact.emails];
    newEmails[index] = value;
    onContactChange({ ...contact, emails: newEmails });
  };

  const removeEmail = (index: number) => {
    const newEmails = contact.emails.filter((_, i) => i !== index);
    onContactChange({ ...contact, emails: newEmails });
  };

  const renderVidaForm = () => {
    const data = claimData as VidaClaimData;
    return (
      <>
        <Input
          label="Nome do Solicitante"
          value={data?.nomeSolicitante || ''}
          onChange={(value) => onClaimDataChange({ ...data, nomeSolicitante: value })}
        />
        <Select
          label="Tipo de Vínculo/Parentesco"
          value={data?.tipoVinculo || ''}
          onChange={(value) => onClaimDataChange({ ...data, tipoVinculo: value })}
          options={TIPO_VINCULO_OPTIONS}
        />
        <MultiSelect
          label="Cobertura"
          selectedValues={data?.coberturas || []}
          onChange={(values) => onClaimDataChange({ ...data, coberturas: values as any })}
          options={VIDA_COBERTURA_OPTIONS}
        />
        <Select
          label="UF da ocorrência"
          value={data?.ufOcorrencia || ''}
          onChange={(value) => onClaimDataChange({ ...data, ufOcorrencia: value })}
          options={BRAZILIAN_STATES}
        />
        <Textarea
          label="Descrição do Evento"
          value={data?.descricaoEvento || ''}
          onChange={(value) => onClaimDataChange({ ...data, descricaoEvento: value })}
          rows={6}
        />
      </>
    );
  };

  const renderRCOForm = () => {
    const data = claimData as RCOClaimData;
    return (
      <>
        <Input
          label="Placa do Segurado"
          value={data?.placaSegurado || ''}
          onChange={(value) => onClaimDataChange({ ...data, placaSegurado: value })}
        />
        <Select
          label="Houve Danos Materiais?"
          value={data?.houveDanosMateriais || ''}
          onChange={(value) => onClaimDataChange({ ...data, houveDanosMateriais: value })}
          options={[
            { value: 'sim', label: 'Sim' },
            { value: 'nao', label: 'Não' }
          ]}
        />
        <Select
          label="Segurado assume culpa?"
          value={data?.seguradoAssumeCulpa || ''}
          onChange={(value) => onClaimDataChange({ ...data, seguradoAssumeCulpa: value })}
          options={[
            { value: 'sim', label: 'Sim' },
            { value: 'nao', label: 'Não' }
          ]}
        />
        <Select
          label="Foi registrado BO?"
          value={data?.registradoBO || ''}
          onChange={(value) => onClaimDataChange({ ...data, registradoBO: value })}
          options={[
            { value: 'sim', label: 'Sim' },
            { value: 'nao', label: 'Não' }
          ]}
        />
        <MultiSelect
          label="Cobertura"
          selectedValues={data?.coberturas || []}
          onChange={(values) => onClaimDataChange({ ...data, coberturas: values as any })}
          options={RCO_COBERTURA_OPTIONS}
        />
        <Select
          label="UF da ocorrência"
          value={data?.ufOcorrencia || ''}
          onChange={(value) => onClaimDataChange({ ...data, ufOcorrencia: value })}
          options={BRAZILIAN_STATES}
        />
        <Textarea
          label="Descrição do Evento"
          value={data?.descricaoEvento || ''}
          onChange={(value) => onClaimDataChange({ ...data, descricaoEvento: value })}
          rows={6}
        />
      </>
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dados do Sinistro</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Dados do Contato</h3>

        <Input
          label="CPF/CNPJ"
          value={contact.cpfCnpj || ''}
          onChange={(value) => onContactChange({ ...contact, cpfCnpj: value })}
        />

        <Checkbox
          label="O contato é o cliente?"
          checked={contact.isClient}
          onChange={(checked) => onContactChange({ ...contact, isClient: checked })}
        />

        <Input
          label="Nome"
          value={contact.name || ''}
          onChange={(value) => onContactChange({ ...contact, name: value })}
        />

        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">E-mails</label>
          {contact.emails.map((email, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => updateEmail(index, e.target.value)}
                placeholder={`E-mail ${index + 1}`}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#003366] focus:outline-none"
              />
              {contact.emails.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEmail(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addEmail}
            className="flex items-center gap-2 px-4 py-2 text-[#003366] border-2 border-[#003366] rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus size={20} />
            Adicionar E-mail
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Dados do Sinistro</h3>
        {claimType === 'vida' && renderVidaForm()}
        {claimType === 'rco' && renderRCOForm()}
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
