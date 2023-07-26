import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { Role } from "../user/user.enum";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";
import { ReportsService } from "./report.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Report')
@UseGuards(AuthGuard)
@Roles(Role.ADMIN,Role.USER)
@Controller('report')
export class ReportController{

    constructor(
        private readonly reportService: ReportsService
    ){}

    @Get(':id')
    async findReport(
        @Param('id') id: number
    ){
        return this.reportService.createReport(id)
    }

}