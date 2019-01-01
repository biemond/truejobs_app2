import { NgModule } from '@angular/core';
import { TruncatePipe } from './limit.pipe';
import { OrderBy } from './orderby.pipe';

@NgModule({
  declarations: [TruncatePipe, OrderBy],
  imports: [],
  exports: [TruncatePipe, OrderBy]
})
export class PipesModule {}
