import { default as _ } from 'lodash'
import * as types from '../constants/types'
import { getComponentData } from '../utils/componentMapper'
import { findComponent, deleteComponent } from '../utils/util'

const initialState = {
  layout: [
    {
      id: 'header1',
      ...getComponentData('header'),
    },
    {
      id: 'card1',
      ...getComponentData('card'),
    },
    {
      id: 'card2',
      ...getComponentData('card'),
    },
  ],
  rootBackground: '#999',
  selectedComponent: null,
}

export default function projectReducer (state = initialState, action) {
  switch (action.type) {
    case types.ADD_COMPONENT:
      return { ...state, layout: [...state.layout, action.payload] }

    case types.DELETE_COMPONENT: {
      const [newLayout] = deleteComponent(state.layout, action.payload)
      return {
        ...state,
        layout: newLayout,
      }
    }

    case types.REPLACE_LAYOUT: {
      return {
        ...state,
        layout: _.cloneDeep(action.payload),
      }
    }

    case types.SELECT_COMPONENT:
      return {
        ...state,
        selectedComponent: action.payload,
      }

    case types.UPDATE_COMPONENT: {
      const newLayout = _.cloneDeep(state.layout)
      let component = newLayout.find(c => c.id === action.payload.id)

      // Check component children if not in root
      if (!component) {
        newLayout.some((c) => {
          component = c.children.find(child => child.id === action.payload.id)
          return !!component
        })

        if (!component) {
          return state
        }
      }

      // If it was a prop change
      if (action.payload.changedProps) {
        component.props = { ...component.props, ...action.payload.changedProps }
      }

      // If it was a change in children (e.g. in Text View)
      if (action.payload.changedChildren) {
        component.children = [...action.payload.changedChildren]
      }

      return {
        ...state,
        layout: newLayout,
        selectedComponent: component,
      }
    }

    default:
      return state
  }
}
