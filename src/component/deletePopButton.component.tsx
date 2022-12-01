import { Popconfirm, Button } from "antd";

interface IdeletePopButtonProps {
  message: string,
  onConfirm: () => void,
  disabled?: boolean,
  className?: string
}

export default function DeletePopButton(props: IdeletePopButtonProps) {

  const { message, onConfirm, disabled, className } = props

  return (
    <Popconfirm
      disabled={disabled}
      title="确认删除嘛?"
      onConfirm={onConfirm}
      okText="确认"
      cancelText="取消"
    >
      <Button
        disabled={disabled}
        className={className}
        danger
      >
        {message}
      </Button>
    </Popconfirm>
  )
}
