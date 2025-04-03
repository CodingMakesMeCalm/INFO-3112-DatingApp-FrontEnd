export interface StandardAddress {
  unit: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  type?: string;
  addressType?: string;
}

export interface IndividualResponsible {
  firstName: string;
  lastName: string;
  relationship: string;
  birthday: string;
  cellphone: string;
  email: string;
}

export interface Prescription {
  prescribedBy: string;
  active: boolean;
  gramsPerDay: number;
  lengthOfPrescription: number;
  registrationDate: string;
  validUntil: string;
  thcLowerLimit: number;
  thcUpperLimit: number;
  cbdLowerLimit: number;
  cbdUpperLimit: number;
  diagnosis: string;
  id: number;
  files: string[];
  totalLimitWeight: number;
  totalWeightUsed: number;
  availableWeight: number;
}

export interface Physician {
  firstName: string;
  lastName: string;
  birthday: string;
  cellphone: string;
  email: string;
  gender?: string;
  physicianNumber: string;
  businessAddress: StandardAddress | null;
}

export interface ClientInfo {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  residenceAddress: StandardAddress;
  mailingAddress: StandardAddress;
  gender: string;
  age: number;
  birthday: string;
  individualResponsible: IndividualResponsible;
  cellphone: string;
  isVeteran: boolean;
  blueCardNo: string;
  typeOfRegistration: string;
  shippingAddress: StandardAddress;
  prescriptions: Prescription[];
  createdAt: string;
  active: boolean;
  archive: boolean;
  careGiver?: Physician;
  identificationFiles: any[];
  prescriptionFiles: any[];
  customerCredits: any[];
}
