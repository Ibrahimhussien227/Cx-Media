export interface IAdminInsightsResponse {
  data: {
    totalCount: number;
    activecount: number;
    invitedcount: number;
    trashedcount: number;
  };
}

export interface IAllAdminResponse {
  data: {
    userId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    profile: { firstName: string; email: string };
  }[];
}

export interface ICreateAdminRequest {
  fullName: string;
  email: string;
  roleId: string;
}

export interface IUpdateAdminByIdRequest {
  id: string;
  body: {
    status?: string;
    fullName?: string;
    email?: string;
    roleId?: string;
    isMfaEnabled?: boolean;
  };
}

export interface IGetAdminByIdRequest {
  id: string;
}

export interface IGetAdminByIdResponse {
  data: {
    userId: string;
    status: string;
    roleId: string;
    profile: {
      fullName: string;
      lastName: string;
      email: string;
      isMfaEnabled: boolean;
    };
  };
}
