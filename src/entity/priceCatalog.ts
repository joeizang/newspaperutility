import {
    PrimaryGeneratedColumn, Entity, Column, OneToMany
} from 'typeorm';
import { Newspaper } from './newspaper';
import { PriceCode } from './priceCode';
import { Moment } from 'moment';

@Entity()
export class PriceCatalog
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "date", nullable: false })
    month: Date;

    @Column({ type: "smallmoney", nullable: false })
    grandTotal: number;

    @Column({type: "smallmoney", nullable: false})
    sumTotal: number;

    @OneToMany(type => Newspaper, newspapers => newspapers.priceCatalog, { 
        eager : true, onDelete: "RESTRICT", onUpdate: "RESTRICT"
    })
    newspapers: Array<Newspaper>;

    @OneToMany(type => PriceCode, priceCodes => priceCodes.priceCatalog, {
        eager: true, onDelete: "RESTRICT", onUpdate: "RESTRICT"
    })
    priceCodes: Array<PriceCode>;
}
