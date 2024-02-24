import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { siweServer } from "@/utils/siweServer"
import { slugify } from "@/utils/utilies"

import { db } from "@/lib/db"

//import { createContactSchema } from "@/lib/validations/contact";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
  const { address } = await siweServer.getSession(req, res)
  const { name } = req.body
  const slug = slugify(name)

  const user = await db.user.findFirst({
    where: {
      address,
    },
  })

  if (user) {
    const group = await db.group.create({
      data: {
        name,
        slug,
      },
    })
    res.status(200).json(group)
  }
  res.status(401)
}

export default handler
