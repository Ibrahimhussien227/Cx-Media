
export type sortConfig = {
  keyToSort: string,
  direction: 'ASC' | 'DESC',
  display: string
}

export interface ITableControlesProps {
  handleTableParamsChange: (param: Partial<ICampaignListQueryParams>)=> void
}