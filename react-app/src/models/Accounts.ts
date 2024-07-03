export interface IAccounts{
    account_id: string;
    pid?: string;
    ftype: string;
    code?: string;
    descr: string;
    address: string;
    chan_id?: string;
    poten_id?: string;
    rc_id?: string;
    region_id?: string;
    city_id?: string;
    latitude?: string;
    longitude?: string;
    props?: string;
    tag_ids?: string;
}

export const accountExample: IAccounts = {
    account_id: "",
    pid: "",
    ftype: "",
    code: "",
    descr: "",
    address: "",
    chan_id: "",
    poten_id: "",
    rc_id: "",
    region_id: "",
    city_id: "",
    latitude: "",
    longitude: "",
    props: ""   
  };