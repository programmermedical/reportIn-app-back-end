-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT NOT NULL,
    "roleLevel" TEXT
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ReportData" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_id_key" ON "Role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_level_key" ON "Role"("level");

-- CreateIndex
CREATE UNIQUE INDEX "ReportData_id_key" ON "ReportData"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleLevel_fkey" FOREIGN KEY ("roleLevel") REFERENCES "Role"("level") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportData" ADD CONSTRAINT "ReportData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
