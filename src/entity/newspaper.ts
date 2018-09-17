import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne
} from 'typeorm';
import { PriceCatalog } from './priceCatalog';

@Entity()
export class Newspaper
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 25, type: "text"})
    name: string;

    @Column({type: "smallmoney"})
    minPrice: number;

    @Column({type: "smallmoney"})
    maxPrice: number;

    @ManyToOne(type => PriceCatalog, priceCatalog => priceCatalog.newspapers, {
        cascade: false, nullable: true
    })
    priceCatalog: PriceCatalog;
}
