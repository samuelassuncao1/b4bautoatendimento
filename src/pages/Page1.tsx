import Select from '../components/Select';
import Button from '../components/Button';

interface Page1Props {
  insuranceCompany: string;
  onInsuranceCompanyChange: (value: string) => void;
  onNext: () => void;
}

export default function Page1({ insuranceCompany, onInsuranceCompanyChange, onNext }: Page1Props) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Selecione sua Seguradora</h2>
        <p className="text-gray-600">Para iniciar seu autoatendimento, selecione o seu seguro</p>
      </div>

      <div className="mb-8">
        <Select
          label="Seguradora"
          value={insuranceCompany}
          onChange={onInsuranceCompanyChange}
          options={[
            { value: 'allseg', label: 'Allseg - Disponível para autoatendimento' }
          ]}
          placeholder="Selecione sua Seguradora"
          required
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!insuranceCompany}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
