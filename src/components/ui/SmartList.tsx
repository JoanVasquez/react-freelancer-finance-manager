import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'

type KeyGetter<T> = (item: T, index: number) => React.Key

export type SmartListProps<T> = {
  items: T[]
  renderItem: (args: { item: T; index: number }) => ReactNode
  height?: number
  itemHeight?: number
  overscan?: number
  getKey?: KeyGetter<T>
  empty?: ReactNode
  header?: ReactNode
  footer?: ReactNode
  className?: string
  disableVirtualization?: boolean
}

export function SmartList<T>({
  items,
  renderItem,
  height = 400,
  itemHeight = 48,
  overscan = 0,
  getKey,
  empty = <div className="smart-list__empty">No data</div>,
  header,
  footer,
  className,
  disableVirtualization = false,
}: SmartListProps<T>) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [scrollTop, setScrollTop] = useState(0)

  const totalHeight = useMemo(
    () => (disableVirtualization ? undefined : items.length * itemHeight),
    [items.length, disableVirtualization],
  )

  const onScroll = useCallback(() => {
    if (!viewportRef.current) return
    setScrollTop(viewportRef.current.scrollTop)
  }, [])

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [onScroll])

  useLayoutEffect(() => {}, [])

  const getKeySafe: KeyGetter<T> = useCallback(
    (item, index) => (getKey ? getKey(item, index) : index),
    [getKey],
  )

  const { startIndex, endIndex, offsetY } = useMemo(() => {
    if (disableVirtualization) {
      return { startIndex: 0, endIndex: items.length - 1, offsetY: 0 }
    }

    const visibleCount = Math.ceil(height / itemHeight)
    const start = Math.max(Math.floor(scrollTop / itemHeight) - overscan, 0)
    const end = Math.min(
      start + visibleCount + overscan * 2,
      Math.max(items.length - 1, 0),
    )
    const offset = start * itemHeight
    return { startIndex: start, endIndex: end, offsetY: offset }
  }, [
    disableVirtualization,
    height,
    itemHeight,
    items.length,
    overscan,
    scrollTop,
  ])

  const visibleItems = useMemo(() => {
    if (items.length === 0) return []
    return items.slice(startIndex, endIndex + 1)
  }, [items, startIndex, endIndex])

  const spacerStyle: CSSProperties | undefined = disableVirtualization
    ? undefined
    : { height: totalHeight }

  const transformStyle: CSSProperties = disableVirtualization
    ? {}
    : { transform: `translateY(${offsetY}px)` }

  return (
    <div className={clsx('smart-list', className)}>
      {header && <div className="smart-list__header">{header}</div>}

      <div
        ref={viewportRef}
        className="smart-list__viewport"
        style={{ height }}
        role="list"
        aria-label="Smart list"
      >
        {items.length === 0 ? (
          empty
        ) : (
          <div className="smart-list__spacer" style={spacerStyle}>
            <div className="smart-list__window" style={transformStyle}>
              {visibleItems.map((item, i) => {
                const realIndex = startIndex + i
                return (
                  <div
                    key={getKeySafe(item, realIndex)}
                    role="listitem"
                    className="smart-list__item"
                    style={{ height: itemHeight }}
                  >
                    {renderItem({ item, index: realIndex })}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {footer && <div className="smart-list__footer">{footer}</div>}
    </div>
  )
}
