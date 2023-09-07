/*
  Warnings:

  - You are about to drop the column `offeredCourseSectionId` on the `student_semester_registration_courses` table. All the data in the column will be lost.
  - Added the required column `offeredCourseSectionIdNew` to the `student_semester_registration_courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "student_semester_registration_courses" DROP CONSTRAINT "student_semester_registration_courses_offeredCourseSection_fkey";

-- AlterTable
ALTER TABLE "student_semester_registration_courses" DROP COLUMN "offeredCourseSectionId",
ADD COLUMN     "offeredCourseSectionIdNew" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "student_semester_registration_courses" ADD CONSTRAINT "student_semester_registration_courses_offeredCourseSection_fkey" FOREIGN KEY ("offeredCourseSectionIdNew") REFERENCES "offered_course_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
