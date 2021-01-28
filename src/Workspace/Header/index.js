import React from "react"
import HeaderButton from "../HeaderButton"
import Box from "@material-ui/core/Box"
import { styled } from "@material-ui/core/styles"

const emptyObj = {}

const myContainerDiv=(props)=>{
  return <div {...props} ></div>
}
const Container = styled(myContainerDiv)({
  width: "100%",
  display: "flex",
  //backgroundColor: "#fff",
  borderBottom: "1px solid #ccc",
  alignItems: "center",
  flexShrink: 1,
  boxSizing: "border-box",
})

type Props = {|
  leftSideContent?: ?React.Node,
  onClickItem?: Function,
  items: Array<{|
    name: string,
    icon?: ?React.Node,
    onClick?: Function,
  |}>,
|}

export const Header = ({
  leftSideContent = null,
  hideHeaderText = false,
  items,
  addedItems,
  headerSubSection,
  onClickItem,
}: Props) => {
  return (
    <Container>
      <Box style={{display:'flex',flexWrap:'wrap',flexDirection:'row',alignItems:'center'}} flexGrow={1}>{leftSideContent}
      {headerSubSection}
      </Box>
      {items.map((item) => (
        <HeaderButton
          key={item.name}
          hideText={hideHeaderText}
          onClick={() => onClickItem(item)}
          {...item}
        />
      ))}
      {addedItems}
    </Container>
  )
}

export default Header
