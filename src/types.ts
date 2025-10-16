export type ClaimType = 'vida' | 'rco' | 'patrimonial';

export type VidaCobertura =
  | 'cancer_infantil'
  | 'dit_acidente_titular'
  | 'dit_doenca_titular'
  | 'dmho'
  | 'doencas_graves_titular'
  | 'invalidez_funcional_doenca_titular'
  | 'invalidez_permanente_acidente_titular'
  | 'morte_acidental_conjuge'
  | 'morte_acidental_filhos'
  | 'morte_acidental_titular'
  | 'morte_natural_conjuge'
  | 'morte_natural_filhos'
  | 'morte_natural_titular'
  | 'reembolso_funeral';

export type RCOCobertura = 'danos_materiais' | 'danos_corporais' | 'danos_morais' | 'despesas';

export interface ContactData {
  cpfCnpj?: string;
  isClient: boolean;
  name?: string;
  emails: string[];
}

export interface VidaClaimData {
  nomeSolicitante?: string;
  tipoVinculo?: string;
  coberturas: VidaCobertura[];
  ufOcorrencia?: string;
  descricaoEvento?: string;
}

export interface RCOClaimData {
  placaSegurado?: string;
  houveDanosMateriais?: string;
  seguradoAssumeCulpa?: string;
  registradoBO?: string;
  coberturas: RCOCobertura[];
  ufOcorrencia?: string;
  descricaoEvento?: string;
}

export interface ClaimFormData {
  insuranceCompany: string;
  claimType: ClaimType | '';
  contact: ContactData;
  claimData: VidaClaimData | RCOClaimData | null;
}

export interface DocumentFile {
  file: File;
  documentType: string;
}
