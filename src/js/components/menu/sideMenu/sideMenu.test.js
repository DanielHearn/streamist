import { mount } from '@vue/test-utils'
import SideMenu from './SideMenu.vue'
import Icons from './../../../icons'

describe('SideMenu', () => {
  const menuItems = [
    {
      itemName: 'Layouts',
      iconName: Icons.layouts
    },
    {
      itemName: 'Favorites',
      iconName: Icons.favorite
    }
  ]
  const slot = '<p>Slot Content</p>'

  const wrapper = mount(SideMenu, {
    propsData: {
      menuItems: menuItems
    },
    slots: {
      default: slot
    }
  })

  const slotElt = wrapper.find('.menu-content')
  const menuItemElts = wrapper.findAll('.button--menu__text')

  test('Slots', () => {
    expect(slotElt.html()).toContain(slot)
  })

  test('menuItems', () => {
    for (let i = 0; i < menuItems.length; i++) {
      expect(menuItemElts.at(i).text()).toBe(menuItems[i].itemName)
    }
  })

  test('menuItems', () => {
    for (let i = 0; i < menuItems.length; i++) {
      expect(menuItemElts.at(i).text()).toBe(menuItems[i].itemName)
    }
  })

  test('loadMenu', () => {
    expect(wrapper.vm.currentMenu).toBe('')

    for (let i = 0; i < menuItems.length; i++) {
      menuItemElts.at(i).trigger('click')
      expect(wrapper.vm.currentMenu).toBe(menuItems[i].itemName)
    }
  })

  test('closeMenu', () => {
    wrapper.vm.closeMenu()
    expect(wrapper.vm.currentMenu).toBe('')

    // Test toggling menu by repeated clicks
    menuItemElts.at(0).trigger('click')
    expect(wrapper.vm.currentMenu).toBe(menuItems[0].itemName)
    menuItemElts.at(0).trigger('click')
    expect(wrapper.vm.currentMenu).toBe('')
  })
})
