// queries
  export interface IBurenScoring {

    _id: string;
    externalScoringResponse: any;
    score?: string;
    customerId?: string;
    reportPurpose?: string;
    keyword?: string;
    restInquiryResponse?: any;
    contractId?: string;
    createdAt?: Date;
    createdBy?: string;
  }


export type BurenScoringQueryResponse = {
  burenCustomerScoringsMain: { list: IBurenScoring[]; totalCount: number };
  refetch: () => void;
  loading: boolean;
};

//export type

export type MutationVariables = {
  _id?: string;
  name: string;
  createdAt?: Date;
  expiryDate?: Date;
  checked?: boolean;
  type?: string;
};

export type AddMutationResponse = {
  addMutation: (params: { variables: MutationVariables }) => Promise<any>;
};

export type EditMutationResponse = {
  editMutation: (params: { variables: MutationVariables }) => Promise<any>;
};

export type RemoveMutationResponse = {
  removeMutation: (params: { variables: { _id: string } }) => Promise<any>;
};

export type EditTypeMutationResponse = {
  typesEdit: (params: { variables: MutationVariables }) => Promise<any>;
};

export type RemoveTypeMutationResponse = {
  typesRemove: (params: { variables: { _id: string } }) => Promise<any>;
};
