import { IPolarisCustomer } from './types';

const keys = [
  'custSegCode',
  'isVatPayer',
  'sexCode',
  'taxExemption',
  'status',
  'noCompany',
  'isCompanyCustomer',
  'industryId',
  'birthPlaceId',
  'familyName',
  'lastName',
  'firstName',
  'shortName',
  'registerMaskCode',
  'registerCode',
  'birthDate',
  'mobile',
  'countryCode',
  'email',
  'industryName',
  'catId',
  'ethnicGroupId',
  'langCode',
  'maritalStatus',
  'birthPlaceName',
  'birthPlaceDetail',
  'phone',
  'fax',
  'isBl',
  'isPolitical',
];

export const validateObject = async (value: IPolarisCustomer) => {
  for (const key in keys) {
    if (!value[key]) throw new Error(`${key} value not filled`);
  }
};
