export interface UomInterface {
    id: string;
    name: string;
    uom: string;
  }
  
  export interface UomResponse {
    uoms: UomInterface[];
    total: number;
  }
  