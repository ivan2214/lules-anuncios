import { auth } from '@/auth'
import Icon from '@/components/ui/icon'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { redirect } from 'next/navigation'
import React from 'react'
import ChangeImage from '@/app/(routes)/account/components/change-image'

const ProfilePage = async () => {
  const session = await auth()

  if (!session) {
    redirect('/auth/login')
  }

  const { user } = session

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="space-y-6 lg:max-w-2xl">
      <section className="w-full">
        <div className="grid gap-6 sm:grid-cols-2">
          <ChangeImage user={user} />
          <Card>
            <CardHeader>
              <CardTitle>Cuentas conectadas</CardTitle>
              <CardDescription>
                Cuentas conectadas con tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user?.accounts && user?.accounts?.length > 0 && (
                <section className="grid grid-cols-2 gap-4">
                  {user?.accounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center space-x-4"
                    >
                      <div>
                        <Icon
                          className="h-8 w-8"
                          name={
                            account.provider === 'Github' ? 'github' : 'chrome'
                          }
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">
                          {account.provider}
                        </h3>
                        <p className="text-sm font-normal tracking-wider text-gray-500">
                          {account.type}
                        </p>
                      </div>
                    </div>
                  ))}
                </section>
              )}
              {(!user.accounts?.length) && (
                <p className="text-sm font-normal tracking-wider text-gray-500">
                  No hay cuentas conectadas
                </p>
              )}
            </CardContent>
          </Card>
          <section className="col-span-2 mt-4 grid w-full gap-4 rounded-xl border bg-card text-card-foreground shadow">
            <div className="space-y-4 p-6">
              <section>
                <h2 className="text-2xl font-bold tracking-tight">
                  Ordenes de compra
                </h2>
                <p className="text-sm font-normal tracking-wider text-gray-500">
                  Total de ordenes: {1}
                </p>
              </section>
              <Separator className="my-4" />
              {/*     <Table>
                <TableBody>
                  {order?.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <p className="text-sm font-normal tracking-wider text-gray-500">
                          {order.id} - {order.createdAt.toLocaleDateString()}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-normal tracking-wider text-gray-500">
                          {order.isFailed
                            ? "Fallida"
                            : order.isPaid
                            ? "Pagada"
                            : "Pendiente"}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-normal tracking-wider text-gray-500">
                          {order.total}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> */}
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}

export default ProfilePage
