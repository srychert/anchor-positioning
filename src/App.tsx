import { useRef, useState } from 'react'
import './App.css'
import { Popover } from './Popover.tsx'
import type { PopoverPosition } from './types.ts'

const grid: { position: PopoverPosition | '-' }[] = [
  { position: 'top-left' },
  { position: 'top-start' },
  { position: 'top' },
  { position: 'top-end' },
  { position: 'top-right' },
  { position: 'left-start' },
  { position: '-' },
  { position: '-' },
  { position: '-' },
  { position: 'right-start' },
  { position: 'left' },
  { position: '-' },
  { position: '-' },
  { position: '-' },
  { position: 'right' },
  { position: 'left-end' },
  { position: '-' },
  { position: '-' },
  { position: '-' },
  { position: 'right-end' },
  { position: 'bottom-left' },
  { position: 'bottom-start' },
  { position: 'bottom' },
  { position: 'bottom-end' },
  { position: 'bottom-right' },
]

function App() {
  const [isOpenNonModal, setIsOpenNonModal] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const showGrid = true

  const nonModalRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      {showGrid && grid.map((cell, index) => {
        if (cell.position === '-') return <div key={index}>-</div>

        return (
          <Popover
            key={index}
            mode='non-modal'
            anchor={
              ({ style, open }) =>
                <button
                  style={{ ...style, minWidth: '8rem' }}
                  onFocus={() => {
                    open()
                  }}
                  onMouseEnter={() => {
                    open()
                  }}
                >
                  {cell.position}
                </button>
            }
            position={cell.position}
          >
            <div style={{ display: 'grid', padding: '1rem', gap: '0.5rem', backgroundColor: 'whitesmoke' }}>
              <button>Lorem ipsum dolor</button>
              <button>Lorem ipsum dolor</button>
              <button>Lorem ipsum dolor</button>
            </div>
          </Popover>
        )
      })}

      {!showGrid && (<div style={{ gridColumn: '1 / -1', display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <span>{JSON.stringify({ isOpenNonModal, isOpenModal }, null, 2)}</span>
        <button onClick={() => {
          setIsOpenNonModal(true)
          setIsOpenModal(true)
        }}>
          open
        </button>
        <button onClick={() => {
          setIsOpenNonModal(false)
          setIsOpenModal(false)
        }}>
          close
        </button>
        <Popover
          ref={nonModalRef}
          disablePageScroll={false}
          anchor={
            ({ style, open }) => <button
              style={style}
              onClick={() => {
                open()
              }}
            >
              non-modal
            </button>
          }
          position="top-start"
          fallbackPositions={['bottom-end', 'bottom-left']}
          isOpen={isOpenNonModal}
          onClose={() => setIsOpenNonModal(false)}
          onOpen={() => setIsOpenNonModal(true)}
        >
          <div style={{ display: 'grid', padding: '1rem', gap: '0.5rem', backgroundColor: 'hotpink' }}>
            <button>Lorem ipsum dolor</button>
            <button>Lorem ipsum dolor</button>
            <button>Lorem ipsum dolor</button>
          </div>
        </Popover>

        <Popover
          ref={modalRef}
          mode='modal'
          disablePageScroll={false}
          anchor={
            ({ style, open }) => <button
              style={style}
              onClick={() => {
                open()
              }}
            >
              modal
            </button>
          }
          position="top-start"
          fallbackPositions={['bottom-end', 'bottom-left']}
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          onOpen={() => setIsOpenModal(true)}
        >
          <div style={{ display: 'grid', padding: '1rem', gap: '0.5rem', backgroundColor: 'cyan' }}>
            <button>Lorem ipsum dolor</button>
            <button>Lorem ipsum dolor</button>
            <button>Lorem ipsum dolor</button>
          </div>
        </Popover>
      </div>)}
    </>
  )
}

export default App
