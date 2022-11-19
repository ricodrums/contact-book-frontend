export interface ITimeStamps {
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IPhone extends ITimeStamps {
  name?: string;
  number?: string;
}

export interface IContact {
  id?: string;
  name?: string;
  lastname?: string;
  email?: string;
  birthday?: string;
  photo?: string | null;
  phone?: string;
}

export interface IContactResponse extends ITimeStamps {
  id: string;
  name?: string;
  lastname?: string;
  email?: string;
  birthday?: string;
  photo?: string | null;
  phones?: IPhone[];
}

export interface IContactListResponse {
  count: number;
  countTotal: number;
  page: number;
  pageTotal: number;
  itemsPerPage: number;
  results: IContactResponse[];
}
