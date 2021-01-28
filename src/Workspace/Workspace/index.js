import React from "react"
import { styled } from "@material-ui/core/styles"
import Header from "../Header"
import IconSidebar from "../IconSidebar"
import RightSidebar from "../RightSidebar"
import WorkContainer from "../WorkContainer"
import useDimensions from "react-use-dimensions"
import { IconDictionaryContext } from "../icon-dictionary.js"

const emptyAr = []
const emptyObj = {}

const Container = styled("div")({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
  maxWidth: "100vw",
})
const SidebarsAndContent = styled("div")({
  display: "flex",
  flexGrow: 1,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  maxWidth: "100vw",
})

export default ({
  style = emptyObj,
  iconSidebarItems = emptyAr,
  selectedTools = ["select"],
  headerItems = emptyAr,
  headerAddedItems,
  headerSubSection,
  rightSidebarItems = emptyAr,
  onClickHeaderItem,
  onClickIconSidebarItem,
  headerLeftSide = null,
  iconDictionary = emptyObj,
  rightSidebarExpanded,
  rightSidebarOnLeft = false,
  hideHeader = false,
  hideHeaderText = false,
  children,
}) => {
  const [sidebarAndContentRef, sidebarAndContent] = useDimensions()
  return (
    <IconDictionaryContext.Provider value={iconDictionary}>
      <Container style={style}>
        {!hideHeader && (
          <Header
          addedItems={headerAddedItems}
            hideHeaderText={hideHeaderText}
            leftSideContent={headerLeftSide}
            headerSubSection={headerSubSection}
            onClickItem={onClickHeaderItem}
            items={headerItems}
          />
        )}
        <SidebarsAndContent ref={sidebarAndContentRef}>
          {iconSidebarItems.length === 0 ? null : (<>
            <IconSidebar
              onClickItem={onClickIconSidebarItem}
              selectedTools={selectedTools}
              items={iconSidebarItems}
            />

            {rightSidebarOnLeft && <RightSidebar style={rightSidebarOnLeft && {right:'auto',left:0}} rightSidebarOnLeft={rightSidebarOnLeft}
            initiallyExpanded={rightSidebarExpanded}
            height={sidebarAndContent.height || 0}
          >
            {rightSidebarItems}
          </RightSidebar>}
          </>
          )}
          <WorkContainer>{children}</WorkContainer>
          {(rightSidebarItems.length === 0 || rightSidebarOnLeft )? null : (
            <RightSidebar
              initiallyExpanded={rightSidebarExpanded}
              height={sidebarAndContent.height || 0}
            >
              {rightSidebarItems}
            </RightSidebar>
          )}
        </SidebarsAndContent>
      </Container>
    </IconDictionaryContext.Provider>
  )
}
