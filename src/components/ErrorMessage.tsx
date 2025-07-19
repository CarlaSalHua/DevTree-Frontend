import { type ReactNode } from 'react'

interface Props {
    children: ReactNode;
}

const ErrorMessage = ({ children }: Props) => {
    return (
        <p className="text-sm text-red-500 mt-1">{children}</p>
  )
}

export default ErrorMessage