import GenericButton from '@/components/ui/GenericButton'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: React.Dispatch<React.SetStateAction<number>>
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="datatable__pagination">
      <GenericButton
        label="◀"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      />
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <GenericButton
        label="▶"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      />
    </div>
  )
}
