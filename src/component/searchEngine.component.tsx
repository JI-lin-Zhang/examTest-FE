import { SearchOutlined } from "@ant-design/icons";
import { Select, Input } from "antd";
import { debounce } from "lodash";
import { useCallback } from "react";
const { Option } = Select;

export interface ISelect {
  name: string;
  value: string;
}
interface ISearchCompany {
  categories: ISelect[];
  selectOnChange?: (value: string) => void;
  inputOnChange: (value: string) => void;
  defaultValue?: boolean;
}
const SearchEngine = (props: ISearchCompany) => {
  const { selectOnChange, inputOnChange, categories, defaultValue } = props;

  const debounceOnChange = useCallback((value: string) => debounceFunction(value), []);
  const debounceFunction = debounce(inputOnChange, 300);

  return (
    <div className="inline-block">
      {selectOnChange && <Select defaultValue={defaultValue ? categories[0].value : null} onChange={selectOnChange}>
        {categories.map((item: ISelect) => (
          <Option value={item.value} key={item.value}>
            {item.name}
          </Option>
        ))}
      </Select>}
      <Input
        placeholder="请输入查询条件"
        allowClear
        className="w-60"
        prefix={<SearchOutlined />}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => debounceOnChange(e.target.value)}
      />
    </div>
  );
};

export default SearchEngine;
