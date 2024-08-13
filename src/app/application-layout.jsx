'use client'

import { Sidebar, SidebarBody, SidebarFooter, SidebarItem, SidebarLabel, SidebarSection } from '@/components/sidebar'
import { SidebarLayout } from '@/components/sidebar-layout'
import { UserButton, useUser } from '@clerk/nextjs'

import { HomeIcon } from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'

export function ApplicationLayout({ children }) {
  let pathname = usePathname()
  const { user } = useUser()

  return (
    <SidebarLayout
      sidebar={
        <Sidebar>
          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/" current={pathname === '/'}>
                <HomeIcon />
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <SidebarItem>
              <span className="flex min-w-0 items-center gap-3">
                <UserButton />
                <span className="min-w-0">
                  <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                    {user?.fullName}
                  </span>
                  <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                    {user?.emailAddresses?.[0]?.emailAddress}
                  </span>
                </span>
              </span>
            </SidebarItem>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
