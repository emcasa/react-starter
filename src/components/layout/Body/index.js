import Row from '@emcasa/ui-dom/components/Row'

export default function Body(props) {
  return (
    <Row
      as="main"
      width="100%"
      flex={1}
      p={2}
      style={{boxSizing: 'border-box'}}
      {...props}
    />
  )
}
