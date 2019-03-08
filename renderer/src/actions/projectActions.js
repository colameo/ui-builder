import * as types from '../constants/types'
import * as API from './api'

export function getProjectName () {
  return async (dispatch, getState) => {
    // const name = await API.getProjectName()
    dispatch({
      type: types.GET_PROJECT_NAME,
      payload: getState().project.name,
    })
  }
}

export function setProjectName (name) {
  return async (dispatch) => {
    const projName = await API.setProjectName(name)
    dispatch({
      type: types.SET_PROJECT_NAME,
      payload: projName,
    })
  }
}

export function addView (view) {
  return {
    type: types.ADD_VIEW,
    payload: view,
  }
}

export function deleteView (viewId) {
  return {
    type: types.DELETE_VIEW,
    payload: viewId,
  }
}