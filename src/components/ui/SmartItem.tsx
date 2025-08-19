import React, { ReactNode } from 'react'
import clsx from 'clsx'

export type SmartItemProps<T> = {
  item: T
  renderItem: (args: { item: T }) => ReactNode
  itemHeight?: number
  className?: string
}

export default function SmartItem<T>({
  item,
  renderItem,
  itemHeight,
  className,
}: SmartItemProps<T>) {
  return (
    <div
      className={clsx('smart-list', className)}
      role="list"
      aria-label="Smart-single item"
    >
      <div
        className="smart-list__items"
        role="listitem"
        style={itemHeight ? { height: itemHeight } : undefined}
      >
        {renderItem({ item })}
      </div>
    </div>
  )
}
