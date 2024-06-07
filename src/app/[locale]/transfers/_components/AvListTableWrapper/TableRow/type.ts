export interface IRowComponent {
  data: {
    id: string;
    listing: string;
    shares: number;
    costs: number;
    return: number;
    appreciation: number;
    grossYield: number;
    netYield: number;
    listingOn: string;
  };
}
