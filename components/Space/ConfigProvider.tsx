import { SpaceProps } from ".";
import React, { PropsWithChildren, createContext } from "react";

export interface ConfigtextType {
  // 接收 space 相关属性
  space?: {
    size: SpaceProps['size']
  }
}

export const ConfigContext = createContext<ConfigtextType>({})

interface ConfigProvider extends PropsWithChildren<ConfigtextType> {

}

// ConfigProvider 做了一层中转。将 Context 进行包裹，透传相关属性与children
export function ConfigProvider(props: ConfigProvider) {
  const {
    space,
    children
  } = props

  return <ConfigContext.Provider value={{space}}>
    {children}
  </ConfigContext.Provider>
}