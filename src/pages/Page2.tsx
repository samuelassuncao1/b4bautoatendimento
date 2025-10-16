import Select from '../components/Select';
import Button from '../components/Button';
import { ClaimType } from '../types';

interface Page2Props {
  claimType: ClaimType | '';
  onClaimTypeChange: (value: ClaimType | '') => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Page2({ claimType, onClaimTypeChange, onNext, onBack }: Page2Props) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">O que você deseja fazer?</h2>
        <p className="text-gray-600">Selecione o serviço que você precisa</p>
      </div>

      <div className="mb-8">
        <Select
          label="Tipo de Serviço"
          value={claimType}
          onChange={(value) => onClaimTypeChange(value as ClaimType | '')}
          options={[
            { value: 'vida', label: 'Abertura de Sinistro Seguro de Vida' },
            { value: 'rco', label: 'Abertura de Sinistro RCO' },
            { value: 'patrimonial', label: 'Abertura de Sinistro Patrimonial' }
          ]}
          placeholder="Selecione o tipo de serviço"
          required
        />
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="secondary">
          Voltar
        </Button>
        <Button onClick={onNext} disabled={!claimType}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
