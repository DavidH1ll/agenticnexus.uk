export const components = {
  h2: (props) => <h2 {...props} />,
  h3: (props) => <h3 {...props} />,
  a: (props) => <a {...props} target={props.href?.startsWith('http') ? '_blank' : undefined} rel={props.href?.startsWith('http') ? 'noreferrer' : undefined} />,
}
