-- CreateTable
CREATE TABLE "ShapeMovement" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shapeIndex" INTEGER NOT NULL,
    "shapeData" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "ShapeMovement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ShapeMovement_roomId_idx" ON "ShapeMovement"("roomId");

-- CreateIndex
CREATE INDEX "ShapeMovement_userId_idx" ON "ShapeMovement"("userId");

-- AddForeignKey
ALTER TABLE "ShapeMovement" ADD CONSTRAINT "ShapeMovement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShapeMovement" ADD CONSTRAINT "ShapeMovement_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
