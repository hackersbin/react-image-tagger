// @flow weak

import React from "react"
import Paper from "@material-ui/core/Paper"
import DefaultRegionLabel from "../RegionLabel"
import LockIcon from "@material-ui/icons/Lock"

const copyWithout = (obj, ...args) => {
  const newObj = { ...obj }
  for (const arg of args) {
    delete newObj[arg]
  }
  return newObj
}

export const RegionTags = ({
  state,
  regions,
  projectRegionBox,
  mouseEvents,
  regionClsList,
  regionTagList,
  onBeginRegionEdit,
  onChangeRegion,
  onCloseRegionEdit,
  onDeleteRegion,
  layoutParams,
  imageSrc,
  RegionEditLabel,
  onRegionClassAdded,
}) => {
  const RegionLabel =
    RegionEditLabel != null ? RegionEditLabel : DefaultRegionLabel
  const mode_onlycurrentRegion={
    "MOVE_REGION":true,
    "RESIZE_BOX":true,
    "MOVE_POLYGON_POINT":true,
    "MOVE_KEYPOINT":true,
    "DRAW_POLYGON":true,
    "DRAW_EXPANDING_LINE":true
  }
  // if(state.mode && mode_onlycurrentRegion[state.mode])
  // {
  //   console.debug('stateinghideothertagsmode!!',state.mode,state.regionId)
  // }
  // console.debug('RegionTags',{nrRe:regions.length,mode:state.mode,regionId:state.regionId})
  return regions
    .filter((r) => (r.visible || r.visible === undefined) && ((!state.mode || !state.mode.mode || !mode_onlycurrentRegion[state.mode.mode]) || state.mode && state.mode.mode && mode_onlycurrentRegion[state.mode.mode] && state.mode.regionId==r.id))
    .map((region) => {
      const pbox = projectRegionBox(region)
      const { iw, ih } = layoutParams.current
      let margin = 8
      if (region.highlighted && region.type === "box") margin += 6
      const labelBoxHeight =
        region.editingLabels && !region.locked ? 170 : region.tags ? 60 : 50
      const displayOnTop = pbox.y > labelBoxHeight

      const coords = displayOnTop
        ? {
            left: pbox.x,
            top: pbox.y - margin / 2,
          }
        : { left: pbox.x, top: pbox.y + pbox.h + margin / 2 }
      if (region.locked) {
        return (
          <div
            key={region.id}
            style={{
              position: "absolute",
              ...coords,
              zIndex: 10 + (region.editingLabels ? 5 : 0),
            }}
          >
            <Paper
              style={{
                position: "absolute",
                left: 0,
                ...(displayOnTop ? { bottom: 0 } : { top: 0 }),
                zIndex: 10,
               // backgroundColor: "#fff",
                borderRadius: 4,
                padding: 2,
                paddingBottom: 0,
                opacity: 0.5,
                pointerEvents: "none",
              }}
            >
              <LockIcon style={{ width: 16, height: 16, color: "#333" }} />
            </Paper>
          </div>
        )
      }
      return (
        <div
          key={region.id}
          style={{
            position: "absolute",
            ...coords,
            zIndex: 10 + (region.editingLabels ? 5 : 0),
            width: 200,
          }}
          onMouseDown={(e) => e.preventDefault()}
          onMouseUp={(e) => e.preventDefault()}
          onMouseEnter={(e) => {
            if (region.editingLabels) {
              mouseEvents.onMouseUp(e)
              e.button = 1
              mouseEvents.onMouseUp(e)
            }
          }}
        >
          <div
            style={{
              position: "absolute",
              zIndex: 20,
              left: 0,
              ...(displayOnTop ? { bottom: 0 } : { top: 0 }),
            }}
            {...(!region.editingLabels
              ? copyWithout(mouseEvents, "onMouseDown", "onMouseUp")
              : {})}
          >
            <RegionLabel
              allowedClasses={regionClsList}
              allowedTags={regionTagList}
              onOpen={onBeginRegionEdit}
              onChange={onChangeRegion}
              onClose={onCloseRegionEdit}
              onDelete={onDeleteRegion}
              editing={region.editingLabels}
              region={region}
              regions={regions}
              imageSrc={imageSrc}
              onRegionClassAdded={onRegionClassAdded}
            />
          </div>
        </div>
      )
    })
}

export default RegionTags
