import { ReactNode, JSX, forwardRef, ForwardedRef } from 'react'
type props = {
  children: ReactNode
}

const Layout = ( { children }: props, ref: ForwardedRef<null> ): JSX.Element => (
  <main ref={ ref }>
    {children}
  </main>
)

export default forwardRef( Layout )