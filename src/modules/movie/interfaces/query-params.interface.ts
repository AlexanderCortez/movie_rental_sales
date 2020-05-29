export interface IQueryParams {
  where: {
    active?: boolean,
    available?: boolean,
    title?: any
  },
  order?: {
    [k: string]: 'ASC' | 'DESC',
  },
  take?: number,
  skip?: number,
}