import { PaginationOptions } from "src/common/paginate";

export class GetListProductsQueryDto extends PaginationOptions {
    category_id: string;
    keyword: string;
}