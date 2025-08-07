import { useState } from 'react'
import { InvoiceItem } from '@/models/Invoice'
import GenericButton from '@/components/ui/GenericButton'
import FormInput from '@/components/ui/FormInput'

type InvoiceItemsEditorProps = {
  items: InvoiceItem[]
  onChange: (items: InvoiceItem[]) => void
}

export default function InvoiceItemsEditor({
  items,
  onChange,
}: InvoiceItemsEditorProps) {
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unitPrice, setUnitPrice] = useState('')

  const addItem = () => {
    if (!description || !quantity || !unitPrice) return
    const newItem: InvoiceItem = {
      description,
      quantity: parseInt(quantity),
      unitPrice: parseFloat(unitPrice),
    }
    onChange([...items, newItem])
    setDescription('')
    setQuantity('')
    setUnitPrice('')
  }

  const removeItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index)
    onChange(updated)
  }

  return (
    <div className="invoice-items">
      <h3>Items</h3>
      <div className="invoice-items__add">
        <FormInput
          id="item-description"
          label="Description"
          value={description}
          onChange={setDescription}
        />
        <FormInput
          id="item-quantity"
          label="Quantity"
          type="number"
          value={quantity}
          onChange={setQuantity}
        />
        <FormInput
          id="item-price"
          label="Unit Price"
          type="number"
          value={unitPrice}
          onChange={setUnitPrice}
        />
        <br />
        <GenericButton label="Add Item" onClick={addItem} />
      </div>

      <ul className="invoice-items__list">
        {items.map((item, index) => (
          <li key={index}>
            <span
              style={{
                paddingRight: '5px',
              }}
            >
              {' '}
              {item.description} - {item.quantity} × ${item.unitPrice} = $
              {(item.quantity * item.unitPrice).toFixed(2)}{' '}
            </span>
            <GenericButton
              label="Remove"
              variant="danger"
              onClick={() => removeItem(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
